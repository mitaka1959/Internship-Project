using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Commands
{

    public class UpdateHotelCommandHandler : IRequestHandler<UpdateHotelCommand, Hotel>
    {
        private readonly IApplicationDbContext _context;

        public UpdateHotelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Hotel> Handle(UpdateHotelCommand request, CancellationToken cancellationToken)
        {
            var hotel = await _context.Hotels
                .Include(h => h.HotelAmenities)
                .FirstOrDefaultAsync(h => h.Id == request.HotelId && !h.IsDeleted, cancellationToken);

            if (hotel == null)
                throw new KeyNotFoundException("Hotel not found");

            
            hotel.Name = request.Name;
            hotel.Stars = request.Stars;
            hotel.City = request.City;
            hotel.Country = request.Country;
            hotel.AddressLine = request.AddressLine;
            hotel.HotelType = request.HotelType;

            
            var existingAmenities = await _context.Amenities
                .Where(a => request.Amenities.Contains(a.Name))
                .ToListAsync(cancellationToken);

            
            var existingAmenityNames = existingAmenities.Select(a => a.Name).ToList();
            var newAmenityNames = request.Amenities.Except(existingAmenityNames).ToList();

            
            var newAmenities = newAmenityNames.Select(name => new Amenity
            {
                Id = Guid.NewGuid(),
                Name = name,
                Emoji = "",
                AmenityType = "", 
                Value = "" 
            }).ToList();

            _context.Amenities.AddRange(newAmenities);

            
            var allAmenities = existingAmenities.Concat(newAmenities).ToList();

            
            hotel.HotelAmenities.Clear();
            foreach (var amenity in allAmenities)
            {
                hotel.HotelAmenities.Add(new HotelAmenity
                {
                    HotelId = hotel.Id,
                    AmenityId = amenity.Id
                });
            }

            await _context.SaveChangesAsync(cancellationToken);

            return hotel;
        }

    }

}
