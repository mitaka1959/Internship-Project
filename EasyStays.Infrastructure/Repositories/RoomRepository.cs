using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using global::EasyStays.Application.Interfaces.Repositories;
using global::EasyStays.Domain.Entities;
using global::EasyStays.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

    namespace EasyStays.Infrastructure.Repositories
    {
        public class RoomRepository : IRoomRepository
        {
            private readonly ApplicationDbContext _context;

            public RoomRepository(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<Room>> GetAvailableRoomsAsync(Guid hotelId)
            {
                return await _context.Rooms
                    .Include(r => r.BedConfigurations)
                    .Include(r => r.RoomUnits) 
                    .Where(r => r.HotelId == hotelId)
                    .ToListAsync();
            }
        }
    }


