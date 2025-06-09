using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;
using MediatR;

namespace EasyStays.Application.UseCases.Reservations.Commands
{
    //public class CreateReservationRequestCommandHandler : IRequestHandler<CreateReservationRequestCommand, Guid>
    //{
    //    private readonly IApplicationDbContext _dbContext;

    //    public CreateReservationRequestCommandHandler(IApplicationDbContext dbContext)
    //    {
    //        _dbContext = dbContext;
    //    }

    //    public async Task<Guid> Handle(CreateReservationRequestCommand request, CancellationToken cancellationToken)
    //    {
    //        var reservation = new Reservation
    //        {
    //            Id = Guid.NewGuid(),
    //            HotelId = request.HotelId,
    //            HotelName = request.HotelName,
    //            Country = request.Country,
    //            City = request.City,
    //            Address = request.Address,
    //            RoomGroupId = request.RoomGroupId,
    //            RoomName = request.RoomName,
    //            FirstName = request.FirstName,
    //            LastName = request.LastName,
    //            PhoneNumber = request.PhoneNumber,
    //            Email = request.Email,
    //            RoomQuantity = request.RoomQuantity,
    //            CheckInDate = request.CheckInDate,
    //            CheckOutDate = request.CheckOutDate,
    //            PricePerNight = request.PricePerNight,
    //            TotalNights = request.TotalNights,
    //            TotalPrice = request.TotalPrice,
    //            ReservationStatus = ReservationStatus.Pending,
    //            CreatedAt = DateTime.UtcNow
    //        };

    //        _dbContext.Reservations.Add(reservation);
    //        await _dbContext.SaveChangesAsync(cancellationToken);

    //        return reservation.Id;
        //}
    //}
}
