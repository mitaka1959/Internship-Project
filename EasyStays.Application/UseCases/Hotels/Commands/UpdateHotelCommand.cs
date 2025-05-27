using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class UpdateHotelCommand : IRequest<Hotel>
    {
        public Guid HotelId { get; set; }
        public Guid UserId { get; set; } 
        public string Name { get; set; } 
        public int Stars { get; set; }
        public string City { get; set; } 
        public string Country { get; set; } 
        public string AddressLine { get; set; }
        public string HotelType { get; set; } 
        public List<string> Amenities { get; set; }

        public UpdateHotelCommand(Guid hotelId)
        {
            HotelId = hotelId;
        }
    }

}
