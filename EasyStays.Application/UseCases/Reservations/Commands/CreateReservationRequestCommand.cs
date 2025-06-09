using EasyStays.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Reservations.Commands
{
    public class CreateReservationRequestCommand: IRequest<Guid>
    {
        public Guid HotelId { get; set; }
        public string HotelName { get; set; }    
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public Guid RoomGroupId { get; set; }
        public string RoomName { get; set; }      
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int RoomQuantity { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal PricePerNight { get; set; }
        public int TotalNights { get; set; }      
        public decimal TotalPrice { get; set; }

    }
}
