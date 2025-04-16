using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class Hotel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string AddressLine { get; set; }
        public int NumberOfRooms { get; set; }
        public float Stars { get; set; }
        public decimal PricePerNight { get; set; }
        public bool IsApproved { get; set; }

        public Guid OwnerId { get; set; }
        public User Owner { get; set; }

        public ICollection<HotelImage> Images { get; set; } = new List<HotelImage>();
        public ICollection<HotelAmenity> HotelAmenities { get; set; } = new List<HotelAmenity>();
        public ICollection<Room> Rooms { get; set; } = new List<Room>();
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
        public ICollection<Review> Reviews  { get; set; } = new List<Review>();
    }

}
