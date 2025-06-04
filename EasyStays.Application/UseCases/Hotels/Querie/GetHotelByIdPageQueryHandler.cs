using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;


namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetHotelByIdPageQueryHandler : IRequestHandler<GetHotelByIdPageQuery, HotelPageDto>
    {
        private readonly IApplicationDbContext _context;

        public GetHotelByIdPageQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<HotelPageDto?> Handle(GetHotelByIdPageQuery request, CancellationToken cancellationToken)
        {
            var hotel = await _context.Hotels
                .Include(h => h.Images)
                .Include(h => h.HotelAmenities).ThenInclude(ha => ha.Amenity)
                .Include(h => h.HotelPolicies).ThenInclude(hp => hp.Policy)
                .Include(h => h.Rooms)
                    .ThenInclude(r => r.Images)
                .Include(h => h.Rooms)
                    .ThenInclude(r => r.RoomAmenities).ThenInclude(ra => ra.Amenity)
                .FirstOrDefaultAsync(h => h.Id == request.hotelId, cancellationToken);

            if (hotel == null)
                return null;

            return new HotelPageDto
            {
                Id = hotel.Id,
                Name = hotel.Name,
                Description = hotel.Description,
                HotelType = hotel.HotelType,
                Stars = hotel.Stars,
                AddressLine = hotel.AddressLine,
                City = hotel.City,
                Country = hotel.Country,
                ContactEmail = hotel.ContactEmail,
                ContactPhone = hotel.ContactPhone,
                CheckInTime = hotel.CheckInTime.ToString("HH:mm"),
                CheckOutTime = hotel.CheckOutTime.ToString("HH:mm"),
                Images = hotel.Images.Select(img => img.ImageUrl).ToList(),
                Amenities = hotel.HotelAmenities.Select(ha => ha.Amenity.Name).ToList(),
                Policies = hotel.HotelPolicies.Select(p => p.Policy.Description).ToList(),
                Rooms = hotel.Rooms.Select(r => new RoomDto
                {
                    Id = r.Id,
                    DisplayName = r.DisplayName,
                    Type = r.Type,
                    Description = r.Description,
                    Capacity = r.Capacity,
                    PricePerNight = r.PricePerNight,
                    RoomSize = r.RoomSize,
                    Images = r.Images.Select(i => i.ImageUrl).ToList(),
                    Amenities = r.RoomAmenities.Select(ra => ra.Amenity.Name).ToList()
                }).ToList()
            };
        }
    }
}

