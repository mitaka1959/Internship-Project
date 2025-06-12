using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EasyStays.Application.Interfaces.Email;
using EasyStays.Application.UseCases.Reservations.DTOs;

namespace EasyStays.Application.UseCases.Reservations.Commands
{
    public class AcceptReservationCommandHandler : IRequestHandler<AcceptReservationCommand, string>
    {
        private readonly IApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IBookingConfirmationPdfGenerator _bookingConfirmationPdfGenerator;

        public AcceptReservationCommandHandler(IApplicationDbContext context, IEmailService emailService, IBookingConfirmationPdfGenerator bookingConfirmationPdfGenerator)
        {
            _context = context;
            _emailService = emailService;
            _bookingConfirmationPdfGenerator = bookingConfirmationPdfGenerator;
        }

        public async Task<string> Handle(AcceptReservationCommand request, CancellationToken cancellationToken)
        {
            var reservation = await _context.Reservations
                .Include(r => r.Room)
                    .ThenInclude(room => room.RoomUnits)
                        .ThenInclude(ru => ru.RoomUnitReservations)
                .FirstOrDefaultAsync(r => r.Id == request.ReservationId, cancellationToken);

            if (reservation == null)
                throw new InvalidOperationException("Reservation not found.");

            if (reservation.Status != ReservationStatus.Pending)
                throw new InvalidOperationException("Only pending reservations can be accepted.");

            var checkInDate = reservation.CheckInDate.Date;
            var checkOutDate = reservation.CheckOutDate.Date;

            var availableRoomUnit = reservation.Room.RoomUnits
                .Where(ru => !ru.IsDeleted)
                .FirstOrDefault(ru => ru.RoomUnitReservations.All(rur =>
                    rur.EndDate <= checkInDate || rur.StartDate >= checkOutDate
                ));

            if (availableRoomUnit == null)
                throw new InvalidOperationException("No available room unit found for the selected dates.");

            var roomUnitReservation = new RoomUnitReservation
            {
                Id = Guid.NewGuid(),
                RoomUnitId = availableRoomUnit.Id,
                ReservationId = reservation.Id,
                StartDate = checkInDate,
                EndDate = checkOutDate
            };

            _context.RoomUnitReservations.Add(roomUnitReservation);

            reservation.Status = ReservationStatus.Confirmed;

            await _context.SaveChangesAsync(cancellationToken);

            await _emailService.SendEmailAsync(
                reservation.Email,
                "Your Reservation is Confirmed",
                $"Dear {reservation.FirstName} {reservation.LastName}, your reservation with a number: {reservation.ReservationNumber} has been confirmed. We look forward to welcoming you!"
            );

            var hotel = await _context.Hotels
                .Include(h => h.Images)
                .Include(h => h.HotelPolicies)
                    .ThenInclude(hp => hp.Policy)
                .FirstOrDefaultAsync(h => h.Id == reservation.Room.HotelId, cancellationToken);

            var dto = new BookingConfirmationDto
            {
                HotelName = hotel?.Name,
                HotelAddress = hotel?.AddressLine,
                HotelPhone = hotel?.ContactPhone,
                FirstName = reservation.FirstName,
                LastName = reservation.LastName,
                ReservationNumber = reservation.ReservationNumber,
                CheckInDate = reservation.CheckInDate,
                CheckOutDate = reservation.CheckOutDate,
                NumberOfNights = (reservation.CheckOutDate - reservation.CheckInDate).Days,
                RoomName = reservation.Room.DisplayName,
                RoomCount = reservation.RoomCount,
                TotalPrice = reservation.TotalPrice,
                HotelPolicies = hotel?.HotelPolicies.Select(p => p.Policy.Description).ToList() ?? new List<string>(),
                SpecialRequests = reservation.SpecialRequests,
                HotelImageUrl = hotel?.Images.FirstOrDefault()?.ImageUrl
            };

            var pdfBytes = _bookingConfirmationPdfGenerator.Generate(dto);

            await _emailService.SendEmailWithAttachmentAsync(
                reservation.Email,
                "Your Reservation is Confirmed",
                "Dear customer, please find your reservation confirmation attached.",
                pdfBytes,
                "BookingConfirmation.pdf"
            );

            return reservation.ReservationNumber;
        }
    }
}
