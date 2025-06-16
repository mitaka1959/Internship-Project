using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using EasyStays.Infrastructure.Identity;


namespace EasyStays.Infrastructure.Persistence
{

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
    {
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<HotelImage> HotelImages { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<ApplicationUser> applicationUsers { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        public DbSet<HotelAmenity> HotelAmenities { get; set; }
        public DbSet<RoomAmenity> RoomAmenities { get; set; }
        public DbSet<RoomImage> RoomImages { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<BedConfiguration> BedConfigurations { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<HotelPolicy> HotelPolicies { get; set; }
        public DbSet<RoomUnit> RoomUnits { get; set; }
        public DbSet<RoomUnitReservation> RoomUnitReservations { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken) =>
       base.SaveChangesAsync(cancellationToken);
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Hotel>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(h => h.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hotel>()
            .HasMany(h => h.Languages)
            .WithMany(l => l.Hotels)
            .UsingEntity(j => j.ToTable("HotelLanguages"));

            modelBuilder.Entity<HotelAmenity>()
                .HasKey(ha => new { ha.HotelId, ha.AmenityId });

            modelBuilder.Entity<HotelAmenity>()
                .HasOne(ha => ha.Hotel)
                .WithMany(h => h.HotelAmenities)
                .HasForeignKey(ha => ha.HotelId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HotelAmenity>()
                .HasOne(ha => ha.Amenity)
                .WithMany(a => a.HotelAmenities)
                .HasForeignKey(ha => ha.AmenityId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<RoomAmenity>()
                .HasKey(ra => new { ra.RoomId, ra.AmenityId });

            modelBuilder.Entity<RoomAmenity>()
                .HasOne(ra => ra.Room)
                .WithMany(r => r.RoomAmenities)
                .HasForeignKey(ra => ra.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RoomAmenity>()
                .HasOne(ra => ra.Amenity)
                .WithMany(a => a.RoomAmenities)
                .HasForeignKey(ra => ra.AmenityId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BedConfiguration>()
                .HasOne(b => b.Room)
                .WithMany(r => r.BedConfigurations)
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.Restrict);



            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Room)
                .WithMany(rm => rm.Reservations)
                .HasForeignKey(r => r.RoomId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Hotel)
                .WithMany(h => h.Reservations)
                .HasForeignKey(r => r.HotelId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Reservation>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Review>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Hotel)
                .WithMany(h => h.Reviews)
                .HasForeignKey(r => r.HotelId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RefreshToken>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(rt => rt.UserId);

            modelBuilder.Entity<RoomUnit>()
                .HasOne(ru => ru.Room)
                .WithMany(r => r.RoomUnits)
                .HasForeignKey(ru => ru.RoomId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelPolicy>()
                .HasKey(hp => new { hp.HotelId, hp.PolicyId });

            modelBuilder.Entity<HotelPolicy>()
                .HasOne(hp => hp.Hotel)
                .WithMany(h => h.HotelPolicies)
                .HasForeignKey(hp => hp.HotelId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HotelPolicy>()
                .HasOne(hp => hp.Policy)
                .WithMany(p => p.HotelPolicies)
                .HasForeignKey(hp => hp.PolicyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RoomUnitReservation>(builder =>
            {
                builder.HasKey(rur => rur.Id);

                builder.HasOne(rur => rur.RoomUnit)
                    .WithMany(ru => ru.RoomUnitReservations)
                    .HasForeignKey(rur => rur.RoomUnitId)
                    .OnDelete(DeleteBehavior.Restrict);

                builder.HasOne(rur => rur.Reservation)
                    .WithMany(r => r.RoomUnitReservations)
                    .HasForeignKey(rur => rur.ReservationId)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.Property(rur => rur.StartDate)
                    .IsRequired();

                builder.Property(rur => rur.EndDate)
                    .IsRequired();
            });
            modelBuilder.Entity<ChatMessage>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.Property(c => c.SenderId).IsRequired();
                entity.Property(c => c.RecipientId).IsRequired();
                entity.Property(c => c.Content).IsRequired();

                entity.HasOne(c => c.Reservation)
                    .WithMany()
                    .HasForeignKey(c => c.ReservationId)
                    .OnDelete(DeleteBehavior.Cascade); 
            });

        }

    }
}
