using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using EasyStays.Application.UseCases.Reservations.DTOs;

namespace EasyStays.Application.UseCases.Reservations.Queries
{
    public class GetConfirmedReservationsQueryHandler : IRequestHandler<GetConfirmedReservationsQuery, List<HostReservationDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetConfirmedReservationsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<HostReservationDto>> Handle(GetConfirmedReservationsQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Reservations
                .Include(r => r.Hotel)
                .Include(r => r.Room)
                .Where(r => r.Status == ReservationStatus.Confirmed);

            if (request.HotelId.HasValue)
            {
                query = query.Where(r => r.HotelId == request.HotelId.Value);
            }

            var result = await query
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new HostReservationDto
                {
                    Id = r.Id,
                    GuestName = r.FirstName + " " + r.LastName,
                    HotelName = r.Hotel.Name,
                    RoomName = r.Room.DisplayName,
                    CheckInDate = r.CheckInDate,
                    CheckOutDate = r.CheckOutDate,
                    TotalPrice = r.TotalPrice
                })
                .ToListAsync(cancellationToken);

            return result;
        }
    }
}
