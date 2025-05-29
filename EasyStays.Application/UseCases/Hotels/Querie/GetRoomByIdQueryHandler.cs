using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetRoomByIdQueryHandler : IRequestHandler<GetRoomByIdQuery, Room>
    {
        private readonly IApplicationDbContext _context;

        public GetRoomByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Room> Handle(GetRoomByIdQuery request, CancellationToken cancellationToken)
        {
            var room = await _context.Rooms
                .Include(r => r.RoomAmenities)
                .ThenInclude(ra => ra.Amenity)
                .Include(r => r.Images)
                .FirstOrDefaultAsync(r => r.Id == request.RoomId && !r.IsDeleted, cancellationToken);

            return room;
        }
    }
}
