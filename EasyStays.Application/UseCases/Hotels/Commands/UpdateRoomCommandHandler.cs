using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
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

            
            room.RoomAmenities.Clear();
            foreach (var amenityId in request.AmenityIds)
            {
                room.RoomAmenities.Add(new RoomAmenity
                {
                    RoomId = room.Id,
                    AmenityId = amenityId
                });
            }

           
            room.BedConfigurations.Clear();
            foreach (var bedConfig in request.BedConfigurations)
            {
                room.BedConfigurations.Add(new BedConfiguration
                {
                    RoomId = room.Id,
                    BedType = bedConfig.BedType, 
                    Quantity = bedConfig.Quantity
                });
            }

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }

}
