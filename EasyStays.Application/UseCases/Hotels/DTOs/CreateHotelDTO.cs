using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class CreateHotelDto
    {
       
        public string Name { get; set; }
        public string HotelType { get; set; }
        public string Description { get; set; }
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int Stars { get; set; }

        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }

        public string CheckInTime { get; set; }          
        public string CheckOutTime { get; set; }        
        public string CancelationPolicy { get; set; }    
        public List<string> HouseRules { get; set; }     

        public List<string> Languages { get; set; }

        public List<RoomGroupDto> RoomGroups { get; set; } = new();
    }

}
