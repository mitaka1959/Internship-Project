using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
        public class User
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string PasswordHash { get; set; }
            public string Role { get; set; } 
            public string? PhoneNumber { get; set; }
            public string? ProfilePictureUrl { get; set; }
            public bool IsEmailVerified { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public DateTime CreatedAt { get; set; }
            public ICollection<Hotel> HotelsOwned { get; set; } = new List<Hotel>();
            public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
            public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }

}

