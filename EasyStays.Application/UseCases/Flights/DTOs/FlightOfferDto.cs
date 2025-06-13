using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Flights.DTOs
{
    public class FlightOfferDto
    {
        public string DepartureAirport { get; set; }
        public string DepartureCity { get; set; }
        public string ArrivalAirport { get; set; }
        public string ArrivalCity { get; set; }
        public List<string> StopoverAirports { get; set; } = new();
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
        public bool IsDirect { get; set; }
        public string Price { get; set; }
        public string CabinClass { get; set; }
        public string Airline { get; set; }
        public string Duration { get; set; }

    }
}
