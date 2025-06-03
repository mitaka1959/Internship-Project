using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using EasyStays.Application.Services;
using EasyStays.Domain.Helpers;
using EasyStays.Application.UseCases.Rooms.Commands;

namespace EasyStays.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger _logger;

        public RoomController(IMediator mediator, ILogger logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost("match")]
        public async Task<ActionResult<RoomMatchResult>> MatchRooms([FromBody] FindBestRoomMatchCommand command)
        {
            var result = await _mediator.Send(command);

            if (result == null || !result.SelectedRooms.Any())
            {
                return NotFound("No matching rooms found.");
            }

            return Ok(result);
        }
    }

}
