using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class RoomGroupDto
    {
        public string RoomType { get; set; }         
        public string DisplayName { get; set; }        
        public string Description { get; set; }
        public int RoomQuantity { get; set; }          
        public int MaxGuests { get; set; }             
        public int RoomSize { get; set; }              
        public decimal PricePerNight { get; set; }

        public List<Guid> AmenityIds { get; set; } = new();
        public List<AmenityDto> Amenities { get; set; }

        public BedConfigurationDto BedConfiguration { get; set; } = new();
    }
}
