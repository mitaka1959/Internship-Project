using System.Net;
using MediatR;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class CreateHotelCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public int NumberOfRooms { get; set; }
        public string AddressLine { get; set; }
        public decimal PricePerNight { get; set; }
        public int Stars { get; set; }

    }
}
