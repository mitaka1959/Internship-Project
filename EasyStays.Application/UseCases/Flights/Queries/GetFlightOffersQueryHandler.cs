using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Flights;
using EasyStays.Application.UseCases.Flights.DTOs;
using System.Text.Json;
using EasyStays.Application.UseCases.Flights.CityCodeMappings;

namespace EasyStays.Application.UseCases.Flights.Queries
{
    public class GetFlightOffersQueryHandler : IRequestHandler<GetFlightOffersQuery, List<FlightOfferDto>>
    {
        private readonly IFlightService _flightService;

        public GetFlightOffersQueryHandler(IFlightService flightService)
        {
            _flightService = flightService;
        }

        public async Task<List<FlightOfferDto>> Handle(GetFlightOffersQuery request, CancellationToken cancellationToken)
        {
            var rawJson = await _flightService.GetFlightOffersAsync(request.Origin, request.Destination, request.DepartureDate, request.Adults);

            var jsonDoc = JsonDocument.Parse(rawJson);
            var root = jsonDoc.RootElement;

            var offers = new List<FlightOfferDto>();

            var carriersDict = root.GetProperty("dictionaries").GetProperty("carriers");
            var locationsDict = root.GetProperty("dictionaries").GetProperty("locations");

            foreach (var offer in root.GetProperty("data").EnumerateArray())
            {
                var itinerary = offer.GetProperty("itineraries")[0];
                var segments = itinerary.GetProperty("segments");

                var firstSegment = segments[0];
                var lastSegment = segments[segments.GetArrayLength() - 1];

                var departureAirportCode = firstSegment.GetProperty("departure").GetProperty("iataCode").GetString();
                var arrivalAirportCode = lastSegment.GetProperty("arrival").GetProperty("iataCode").GetString();

                var departureCityCode = locationsDict.GetProperty(departureAirportCode).GetProperty("cityCode").GetString();
                var arrivalCityCode = locationsDict.GetProperty(arrivalAirportCode).GetProperty("cityCode").GetString();

                var departureCity = CityCodeMappings.CityCodeMappings.CityCodeToName.ContainsKey(departureCityCode)
                    ? CityCodeMappings.CityCodeMappings.CityCodeToName[departureCityCode]
                    : departureCityCode;

                var arrivalCity = CityCodeMappings.CityCodeMappings.CityCodeToName.ContainsKey(arrivalCityCode)
                    ? CityCodeMappings.CityCodeMappings.CityCodeToName[arrivalCityCode]
                    : arrivalCityCode;

                var airlineCode = offer.GetProperty("validatingAirlineCodes")[0].GetString();
                string airlineName;
                if (carriersDict.TryGetProperty(airlineCode, out var airlineNameElement))
                {
                    airlineName = airlineNameElement.GetString();
                }
                else
                {
                    airlineName = airlineCode; 
                }

                var travelerPricing = offer.GetProperty("travelerPricings")[0];
                var cabin = travelerPricing.GetProperty("fareDetailsBySegment")[0].GetProperty("cabin").GetString();

                
                var stopoverAirports = new List<string>();

                if (segments.GetArrayLength() > 1)
                {
                    for (int i = 0; i < segments.GetArrayLength() - 1; i++)
                    {
                        var stopoverAirportCode = segments[i].GetProperty("arrival").GetProperty("iataCode").GetString();
                        stopoverAirports.Add(stopoverAirportCode);
                    }
                }

                offers.Add(new FlightOfferDto
                {
                    DepartureAirport = departureAirportCode,
                    DepartureCity = departureCity,
                    ArrivalAirport = arrivalAirportCode,
                    ArrivalCity = arrivalCity,
                    DepartureTime = firstSegment.GetProperty("departure").GetProperty("at").GetString(),
                    ArrivalTime = lastSegment.GetProperty("arrival").GetProperty("at").GetString(),
                    IsDirect = segments.GetArrayLength() == 1,
                    Price = offer.GetProperty("price").GetProperty("grandTotal").GetString() + " " + offer.GetProperty("price").GetProperty("currency").GetString(),
                    CabinClass = cabin,
                    Airline = airlineName,
                    Duration = itinerary.GetProperty("duration").GetString(),
                    StopoverAirports = stopoverAirports
                });
            }

            return offers;
        }
    }
}
