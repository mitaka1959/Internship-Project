using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Reservations.Queries
{
    public class GetPendingReservationQueryHandler : IRequestHandler<GetPendingReservationsForHostQuery, List<PendingReservationDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetPendingReservationQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PendingReservationDto>> Handle(GetPendingReservationsForHostQuery request, CancellationToken cancellationToken)
        {
            var query = _dbContext.Reservations
                .Include(r => r.Hotel)
                .Include(r => r.Room)
                .Where(r => r.Status == ReservationStatus.Pending);

            if (request.HotelId.HasValue)
            {
                query = query.Where(r => r.HotelId == request.HotelId.Value);
            }

            var result = await query
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new PendingReservationDto
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
