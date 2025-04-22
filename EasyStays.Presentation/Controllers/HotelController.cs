using Microsoft.AspNetCore.Mvc;
using MediatR;
using EasyStays.Application.UseCases.Hotels;
using EasyStays.Application.UseCases.Hotels.Querie;

namespace EasyStays.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController: ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<HotelsController> _logger;

        public HotelsController(IMediator mediator, ILogger<HotelsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHotelCommand command)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            _logger.LogInformation(" Hotel creation endpoint hit at {Time}", DateTime.UtcNow);

            var hotelId = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetById), new { id = hotelId }, hotelId);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
           
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await _mediator.Send(new GetAllHotelsQuery());
            return Ok(hotels);
        }
    }
}
