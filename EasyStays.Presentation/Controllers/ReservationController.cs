using EasyStays.Application.UseCases.Reservations.Commands;
using EasyStays.Application.UseCases.Reservations.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EasyStays.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<ReservationController> _logger;

        public ReservationController(IMediator mediator, ILogger<ReservationController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationRequestCommand command)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Invalid user.");
            }

            command.UserId = userId;

            var reservationId = await _mediator.Send(command);

            return Ok(reservationId);
        }

        [Authorize(Policy = "RequireHostRole")]
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingReservations([FromQuery] Guid? hotelId)
        {
            var query = new GetPendingReservationsForHostQuery
            {
                HotelId = hotelId
            };

            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [Authorize(Policy = "RequireHostRole")]
        [HttpPost("{reservationId}/accept")]
        public async Task<IActionResult> AcceptReservation(Guid reservationId, CancellationToken cancellationToken)
        {
            var command = new AcceptReservationCommand(reservationId);

            var reservationNumber = await _mediator.Send(command, cancellationToken);

            return Ok(new { ReservationNumber = reservationNumber });
        }

        [Authorize(Policy = "RequireHostRole")]
        [HttpPost("{reservationId}/decline")]
        public async Task<IActionResult> DeclineReservation(Guid reservationId, CancellationToken cancellationToken)
        {
            var command = new DeclineReservationCommand(reservationId);

            var reservationNumber = await _mediator.Send(command, cancellationToken);

            return Ok(new { ReservationNumber = reservationNumber });
        }
    }
}
