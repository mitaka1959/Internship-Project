using EasyStays.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyStays.Domain.Entities
{
    public class Hotel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string HotelType { get; set; } 
        public string Description { get; set; }

        //location
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double Latitude { get; set; }  
        public double Longitude { get; set; } 
        public int Stars { get; set; }

        // Contact 
        public string ContactEmail { get; set; } 
        public string ContactPhone { get; set; } 

        // Policies
        public TimeOnly CheckInTime { get; set; } 
        public TimeOnly CheckOutTime { get; set; } 
        public CancelationPolicy CancellationPolicy { get; set; } 
        public decimal? DamageDeposit { get; set; } 
        public string OwnerId { get; set; } = string.Empty;
        public bool IsApproved { get; set; } = false;
        public bool IsDeleted { get; set; } = false;
        public int GetAvailableRoomsCount(DateTime? targetDate = null)
        {
            var date = targetDate?.Date ?? DateTime.UtcNow.Date;

            return Rooms?
                .SelectMany(r => r.RoomUnits)
                .Where(ru => !ru.IsDeleted)
                .Count(ru => ru.RoomUnitReservations
                    .Where(rur =>
                        rur.Reservation != null &&
                        (rur.Reservation.Status == ReservationStatus.Confirmed ||
                         rur.Reservation.Status == ReservationStatus.CheckedIn))
                    .All(rur => rur.EndDate <= date || rur.StartDate > date)
                ) ?? 0;
        }

        [NotMapped]
        public int AvailableRooms => GetAvailableRoomsCount();

        public int TotalRooms => Rooms?
            .SelectMany(r => r.RoomUnits)
            .Count() ?? 0;

        public ICollection<HotelImage> Images { get; set; } = new List<HotelImage>();
        public ICollection<HotelAmenity> HotelAmenities { get; set; } = new List<HotelAmenity>();
        public ICollection<Room> Rooms { get; set; } = new List<Room>();
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Language> Languages { get; set; } = new List<Language>();
        public ICollection<HotelPolicy> HotelPolicies { get; set; } = new List<HotelPolicy>();

    }


}
