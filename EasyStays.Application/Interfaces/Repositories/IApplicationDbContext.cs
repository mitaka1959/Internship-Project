using EasyStays.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using Microsoft.EntityFrameworkCore;


namespace EasyStays.Application.Interfaces.Repositories
{
    public interface IApplicationDbContext
    {
        DbSet<Hotel> Hotels { get; }
        public DbSet<Amenity> Amenities { get; }
        public DbSet<HotelImage> HotelImages { get; }
        public DbSet<Room> Rooms { get; }
        public DbSet<RoomImage> RoomImages { get; }
        public DbSet<BedConfiguration> BedConfigurations { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }

}
