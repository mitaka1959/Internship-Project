using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class Room
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public string Type { get; set; }
        public string DisplayName { get; set; } 
        public string Description { get; set; }

        public int Capacity { get; set; } 
        public decimal PricePerNight { get; set; }
        public int RoomCount { get; set; } 

        public int RoomSize { get; set; } 
        public string BedConfiguration { get; set; } 

        public bool IsAvailable { get; set; }

        public ICollection<RoomAmenity> RoomAmenities { get; set; } = new List<RoomAmenity>();
        public ICollection<RoomImage> Images { get; set; } = new List<RoomImage>(); 
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }


}
