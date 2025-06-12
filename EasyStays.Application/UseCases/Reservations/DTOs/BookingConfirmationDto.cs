using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Reservations.DTOs
{
    public class BookingConfirmationDto
    {
        public string HotelName { get; set; }
        public string HotelAddress { get; set; }
        public string HotelPhone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ReservationNumber { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int NumberOfNights { get; set; }
        public string RoomName { get; set; }
        public int RoomCount { get; set; }
        public decimal TotalPrice { get; set; }
        public List<string> HotelPolicies { get; set; } = new();
        public string? SpecialRequests { get; set; }
        public string HotelImageUrl { get; set; }
    }
}
