using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Infrastructure.Persistence;
using EasyStays.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Infrastructure.Repositories
{
    public class HotelRepository : IHotelRepository
    {
        private readonly ApplicationDbContext _context;

        public HotelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Hotel hotel)
        {
            _context.AddAsync(hotel);
            _context.SaveChanges();
        }
        public async Task<List<Hotel>> GetAllAsync()
        {
            return await _context.Hotels.ToListAsync();
        }

    }
}
