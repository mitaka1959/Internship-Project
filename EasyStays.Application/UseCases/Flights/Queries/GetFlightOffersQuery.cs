using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Flights.DTOs;

namespace EasyStays.Application.UseCases.Flights.Queries
{
    public class GetFlightOffersQuery : IRequest<List<FlightOfferDto>>
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string DepartureDate { get; set; }
        public int Adults { get; set; }

        public GetFlightOffersQuery(string origin, string destination, string departureDate, int adults)
        {
            Origin = origin;
            Destination = destination;
            DepartureDate = departureDate;
            Adults = adults;
        }
    }
}
