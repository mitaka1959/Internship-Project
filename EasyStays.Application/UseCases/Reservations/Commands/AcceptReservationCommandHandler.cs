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

namespace EasyStays.Application.UseCases.Reservations.Commands
{
    public class AcceptReservationCommandHandler : IRequestHandler<AcceptReservationCommand, string>
    {
        private readonly IApplicationDbContext _context;

        public AcceptReservationCommandHandler(IApplicationDbContext context)
        {
            _context = context;
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

            return reservation.ReservationNumber;
        }
    }
}
