using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Reservations.Commands;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;
using MediatR;

namespace EasyStays.Application.UseCases.Reservations.Handlers
{
    public class CreateReservationRequestCommandHandler : IRequestHandler<CreateReservationRequestCommand, Guid>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateReservationRequestCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Handle(CreateReservationRequestCommand request, CancellationToken cancellationToken)
        {
            var reservation = new Reservation
            {
                Id = Guid.NewGuid(),
                ReservationNumber = $"RES-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 4)}",
                UserId = request.UserId ?? string.Empty,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                HotelId = request.HotelId,
                RoomId = request.RoomGroupId, 
                RoomCount = request.RoomQuantity,
                CheckInDate = request.CheckInDate,
                CheckOutDate = request.CheckOutDate,
                Status = ReservationStatus.Pending,
                TotalPrice = request.TotalPrice,
                SpecialRequests = null, 
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = null,
                Payment = null
            };

            _dbContext.Reservations.Add(reservation);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return reservation.Id;
        }
    }
}
