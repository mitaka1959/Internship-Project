using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class RoomMatchRequest
    {
        public int Adults { get; set; }
        public int Children { get; set; }
        public int? RequestedRooms { get; set; } 
        public string? HotelId { get; set; } 
    }
}
