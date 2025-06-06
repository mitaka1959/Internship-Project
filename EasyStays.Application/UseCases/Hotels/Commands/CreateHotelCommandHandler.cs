using EasyStays.Application.Interfaces.Auth;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateHotelCommandHandler : IRequestHandler<CreateHotelCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public CreateHotelCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Guid> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.UserId;

        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedAccessException("User is not authenticated.");

        var hotel = new Hotel
        {
            Id = Guid.NewGuid(),
            OwnerId = userId,
            Name = request.Name,
            HotelType = request.HotelType,
            Description = request.Description,
            City = request.City,
            Country = request.Country,
            AddressLine = request.AddressLine,
            Stars = request.Stars,
            ContactEmail = request.ContactEmail,
            ContactPhone = request.ContactPhone,
            CheckInTime = TimeOnly.Parse(request.CheckInTime),
            CheckOutTime = TimeOnly.Parse(request.CheckOutTime),
            CancellationPolicy = Enum.Parse<CancelationPolicy>(request.CancelationPolicy),
            Languages = request.Languages.Select(l => new Language { Name = l }).ToList()
        };

        if (request.Policies != null && request.Policies.Any())
        {
            var cleanedPolicies = request.Policies
                .Where(p => !string.IsNullOrWhiteSpace(p))
                .Select(p => p.Trim())
                .ToList();

            foreach (var description in cleanedPolicies)
            {
                var existingPolicy = await _context.Policies
                    .FirstOrDefaultAsync(p => p.Description.ToLower() == description.ToLower(), cancellationToken);

                if (existingPolicy == null)
                {
                    existingPolicy = new Policy
                    {
                        Id = Guid.NewGuid(),
                        Description = description
                    };
                    _context.Policies.Add(existingPolicy);
                }

                hotel.HotelPolicies.Add(new HotelPolicy
                {
                    HotelId = hotel.Id,
                    PolicyId = existingPolicy.Id
                });
            }
        }

        var existingAmenities = await _context.Amenities.ToListAsync(cancellationToken);

        hotel.Rooms = request.RoomGroups.Select(group =>
        {
            var roomAmenities = new List<RoomAmenity>();

            foreach (var amenityDto in group.Amenities)
            {
                var amenity = existingAmenities
                    .FirstOrDefault(a => a.Name.Equals(amenityDto.Name, StringComparison.OrdinalIgnoreCase));

                if (amenity == null)
                {
                    amenity = new Amenity
                    {
                        Id = Guid.NewGuid(),
                        Name = amenityDto.Name,
                        Emoji = amenityDto.Emoji,
                        AmenityType = "Room",
                        Value = amenityDto.Name 
                    };
                    _context.Amenities.Add(amenity);
                    existingAmenities.Add(amenity);
                }


                roomAmenities.Add(new RoomAmenity
                {
                    AmenityId = amenity.Id,
                    Name = amenity.Name 
                });
            }

            return new Room
            {
                Id = Guid.NewGuid(),
                HotelId = hotel.Id,
                DisplayName = group.DisplayName,
                Type = group.RoomType,
                Description = group.Description,
                Capacity = group.MaxGuests,
                PricePerNight = group.PricePerNight,
                RoomCount = group.RoomQuantity,
                RoomSize = group.RoomSize,
                BedConfigurations = new List<BedConfiguration>
                {
                    new() { BedType = BedType.singleBed, Quantity = group.BedConfiguration.Single },
                    new() { BedType = BedType.queenSizeBed, Quantity = group.BedConfiguration.Queen },
                    new() { BedType = BedType.kingSizeBed, Quantity = group.BedConfiguration.King },
                }.Where(b => b.Quantity > 0).ToList(),
                RoomAmenities = roomAmenities,
                RoomUnits = Enumerable.Range(1, group.RoomQuantity).Select(i => new RoomUnit
                {
                    Id = Guid.NewGuid(),
                    IsAvailable = true,
                    Number = null
                }).ToList()
            };
        }).ToList();

        _context.Hotels.Add(hotel);
        await _context.SaveChangesAsync(cancellationToken);

        return hotel.Id;
    }
}
