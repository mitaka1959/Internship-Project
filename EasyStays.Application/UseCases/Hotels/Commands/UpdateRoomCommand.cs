using EasyStays.Application.UseCases.Hotels.DTOs;
using EasyStays.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class UpdateRoomCommand: IRequest<bool>
    {
        public Guid RoomId { get; set; }
        public decimal PricePerNight { get; set; }
        public int RoomCount { get; set; }
        public int Capacity { get; set; }
        public BedType BedType { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public int RoomSize { get; set; }
        public List<AmenityDto> Amenities { get; set; } = new();

        public List<BedConfigurationUpdateDto> BedConfigurations { get; set; } = new();
    }

        public class BedConfigurationUpdateDto
    {
            public BedType BedType { get; set; }
            public int Quantity { get; set; }
        }

}



