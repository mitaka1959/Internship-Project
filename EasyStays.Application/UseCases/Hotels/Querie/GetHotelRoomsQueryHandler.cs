using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using MediatR;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetHotelRoomsQueryHandler : IRequestHandler<GetHotelRoomsQuery, List<Room>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public GetHotelRoomsQueryHandler(IApplicationDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<List<Room>> Handle(GetHotelRoomsQuery query, CancellationToken cancellationToken)
        {
            var room = await _context.Rooms
                .Where(r => r.HotelId == query.HotelId)
                .Include(r => r.Images)
                .Include(r => r.RoomUnits)
                .ToListAsync(cancellationToken);

            return  room ?? throw new KeyNotFoundException("No rooms found for the specified hotel.");
        }
    }
}
