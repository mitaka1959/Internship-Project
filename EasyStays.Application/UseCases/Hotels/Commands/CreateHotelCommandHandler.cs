using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using EasyStays.Application.UseCases.Hotels.Commands;



public class CreateHotelCommandHandler : IRequestHandler<CreateHotelCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateHotelCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
    {
        var hotel = new Hotel
        {
            Id = Guid.NewGuid(),
            OwnerId = request.OwnerId,
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
            HouseRules = string.Join(";", request.HouseRules),
            Languages = request.Languages.Select(l => new Language { Name = l }).ToList()
        };

        var allAmenities = await _context.Amenities.ToListAsync(cancellationToken);

        hotel.Rooms = request.RoomGroups.Select(group =>
        {
            var matchedAmenities = allAmenities
                .Where(a => group.Amenities.Contains(a.Name))
                .Select(a => new RoomAmenity { AmenityId = a.Id })
                .ToList();

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
                IsAvailable = true,

                BedConfigurations = new List<BedConfiguration>
            {
                new() { BedType = BedType.singleBed, Quantity = group.BedConfiguration.Single },
                new() { BedType = BedType.queenSizeBed, Quantity = group.BedConfiguration.Queen },
                new() { BedType = BedType.kingSizeBed, Quantity = group.BedConfiguration.King },
            }.Where(b => b.Quantity > 0).ToList(),

                RoomAmenities = matchedAmenities
            };
        }).ToList();

        _context.Hotels.Add(hotel);
        await _context.SaveChangesAsync(cancellationToken);

        return hotel.Id;
    }
}
