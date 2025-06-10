using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Enums;

namespace EasyStays.Domain.Entities
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public string ReservationNumber { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
        public int RoomCount { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public ReservationStatus Status { get; set; }
        public decimal TotalPrice { get; set; }
        public string? SpecialRequests { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public Payment? Payment { get; set; }
        public ICollection<RoomUnitReservation> RoomUnitReservations { get; set; } = new List<RoomUnitReservation>();
    }

}
