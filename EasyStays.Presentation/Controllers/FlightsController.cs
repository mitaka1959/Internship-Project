using EasyStays.Application.UseCases.Flights.DTOs;
using EasyStays.Application.UseCases.Flights.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using EasyStays.Application.UseCases.Flights.CityCodeMapping;   

namespace EasyStays.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<FlightsController> _logger;

        public FlightsController(IMediator mediator, ILogger<FlightsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetFlights(string origin, string destination, string departureDate, int adults = 1)
        {
            var originCode = CityNameToCode.CityNamesToCode.ContainsKey(origin) ? CityNameToCode.CityNamesToCode[origin] : origin;
            var destinationCode = CityNameToCode.CityNamesToCode.ContainsKey(destination) ? CityNameToCode.CityNamesToCode[destination] : destination;

            var result = await _mediator.Send(new GetFlightOffersQuery(originCode, destinationCode, departureDate, adults));
            return Ok(result);
        }


    }
}
