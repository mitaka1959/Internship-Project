using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class HotelPageDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HotelType { get; set; }
        public int Stars { get; set; }

        public string AddressLine { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }

        public string CheckInTime { get; set; }
        public string CheckOutTime { get; set; }

        public  IQueryable<string> Images { get; set; }
        public IQueryable<string> Amenities { get; set; } //= new();
        public IQueryable<string> Policies { get; set; }// = new();

        public IQueryable<RoomDto> Rooms { get; set; } //= new();
    }

    public class RoomDto
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public decimal PricePerNight { get; set; }
        public int RoomSize { get; set; }

        public IQueryable<string> Images { get; set; } //= new();
        public IQueryable<string> Amenities { get; set; }// = new();
    }
}
