using EasyStays.Application.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Reservations.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Reservations.Queries
{
    public class GetUserReservationsQueryHandler : IRequestHandler<GetUserReservationsQuery, List<UserReservationDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetUserReservationsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserReservationDto>> Handle(GetUserReservationsQuery request, CancellationToken cancellationToken)
        {
            var reservations = await _context.Reservations
                .Include(r => r.Hotel)
                .Include(r => r.Room)
                .Where(r => r.UserId == request.UserId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new UserReservationDto
                {
                    Id = r.Id,
                    HotelName = r.Hotel.Name,
                    RoomName = r.Room.DisplayName,
                    CheckInDate = r.CheckInDate,
                    CheckOutDate = r.CheckOutDate,
                    TotalPrice = r.TotalPrice,
                    Status = r.Status.ToString()
                })
                .ToListAsync(cancellationToken);

            return reservations;
        }
    }
}
