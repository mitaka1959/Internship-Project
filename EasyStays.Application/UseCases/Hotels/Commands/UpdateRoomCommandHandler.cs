using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.Commands;
using EasyStays.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using System;
using System.Linq;

public class UpdateRoomCommandHandler : IRequestHandler<UpdateRoomCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public UpdateRoomCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateRoomCommand request, CancellationToken cancellationToken)
    {
        var room = await _context.Rooms
            .Include(r => r.RoomAmenities)
            .Include(r => r.BedConfigurations)
            .FirstOrDefaultAsync(r => r.Id == request.RoomId && !r.IsDeleted, cancellationToken);

        if (room == null) return false;

        room.PricePerNight = request.PricePerNight;
        room.RoomCount = request.RoomCount;
        room.Capacity = request.Capacity;
        room.RoomSize = request.RoomSize;
        room.DisplayName = request.DisplayName;
        room.Description = request.Description;

        
        var existingBedConfigs = await _context.BedConfigurations
            .Where(b => b.RoomId == room.Id)
            .ToListAsync(cancellationToken);
        _context.BedConfigurations.RemoveRange(existingBedConfigs);

        
        foreach (var bedConfig in request.BedConfigurations)
        {
            room.BedConfigurations.Add(new BedConfiguration
            {
                RoomId = room.Id,
                BedType = bedConfig.BedType,
                Quantity = bedConfig.Quantity
            });
        }

        
        var existingRoomAmenities = await _context.RoomAmenities
            .Where(ra => ra.RoomId == room.Id)
            .ToListAsync(cancellationToken);
        _context.RoomAmenities.RemoveRange(existingRoomAmenities);

      
        foreach (var amenityDto in request.Amenities)
        {
            var amenity = new Amenity
            {
                Id = Guid.NewGuid(),
                Name = amenityDto.Name,
                Emoji = amenityDto.Emoji,
                AmenityType = "Room",
                Value = amenityDto.Name
            };

            _context.Amenities.Add(amenity);

            room.RoomAmenities.Add(new RoomAmenity
            {
                RoomId = room.Id,
                AmenityId = amenity.Id,
                Name = amenity.Name
            });
        }

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}
