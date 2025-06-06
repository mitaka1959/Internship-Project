using Microsoft.AspNetCore.Mvc;
using MediatR;
using EasyStays.Application.UseCases.Hotels;
using EasyStays.Application.UseCases.Hotels.Querie;
using EasyStays.Application.UseCases.Hotels.Commands;

using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.OutputCaching;

namespace EasyStays.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<HotelsController> _logger;

        public HotelsController(IMediator mediator, ILogger<HotelsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHotelCommand command)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .Select(e => new
                    {
                        Field = e.Key,
                        Errors = e.Value.Errors.Select(x => x.ErrorMessage)
                    });

                return BadRequest(new { message = "Validation Failed", errors });
            }

            _logger.LogInformation("Hotel creation endpoint hit at {Time}", DateTime.UtcNow);

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
        [Authorize(Roles = "Host")]
        [HttpGet("my-hotels")]
        public async Task<IActionResult> GetMyHotels()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found.");

            var result = await _mediator.Send(new GetMyHotelsQuery(userId));

            return Ok(result);
        }

        [HttpPost("{hotelId}/images")]
        public async Task<IActionResult> UploadImages(Guid hotelId, [FromForm] List<IFormFile> images)
        {
            if (images == null || !images.Any())
            {
                return BadRequest("No images provided.");
            }

            var command = new UploadHotelImagesCommand
            {
                HotelId = hotelId,
                Images = images.Select(img => new HotelImageUploadDto
                {
                    FileName = img.FileName,
                    Content = img.OpenReadStream()
                }).ToList()
            };

            _logger.LogInformation("Hotel image upload endpoint hit at {Time}", DateTime.UtcNow);

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPatch("{id}/delete")]
        public async Task<IActionResult> DeleteHotel(Guid id)
        {
            await _mediator.Send(new DeleteHotelCommand(id));
            return NoContent();
        }

        [HttpGet("get-hotel-info/{id}")]
        public async Task<IActionResult> GetHotelForEdit(Guid id)
        {
            var userIdString = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                return Unauthorized();
            }

            if (!Guid.TryParse(userIdString, out var userId))
            {
                return BadRequest("Invalid user ID format");
            }

            var query = new GetHotelByIdQuery(id, userId);
            var hotel = await _mediator.Send(query);

            if (hotel == null)
            {
                return NotFound();
            }

            return Ok(hotel);
        }


        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateHotelCommand command)
        {
            if (id != command.HotelId)
            {
                return BadRequest("Hotel ID mismatch.");
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            command.UserId = new Guid(userId);

            await _mediator.Send(command);
            return NoContent();
        }
        [HttpGet("{hotelId}/rooms")]
        public async Task<IActionResult> GetHotelRooms(Guid hotelId)
        {
            var query = new GetHotelRoomsQuery(hotelId);
            var rooms = await _mediator.Send(query);

            if (rooms == null || !rooms.Any())
            {
                return NotFound("No rooms found for the specified hotel.");
            }

            return Ok(rooms);

        }
        [HttpGet("{id}/edit-room")]
        public async Task<IActionResult> GetRoomById(Guid id)
        {
            var room = await _mediator.Send(new GetRoomByIdQuery(id));

            if (room == null)
            {
                return NotFound("Room not found");
            }

            return Ok(room);
        }

        [HttpPost("Rooms/{roomId}/images")]
        public async Task<IActionResult> UploadRoomImages(Guid roomId, [FromForm] List<IFormFile> images)
        {
            if (images == null || !images.Any())
            {
                return BadRequest("No images provided.");
            }

            var command = new UploadRoomImagesCommand
            {
                RoomId = roomId,
                Images = images.Select(img => new RoomImageUpload
                {
                    FileName = img.FileName,
                    Content = img.OpenReadStream()
                }).ToList()
            };

            _logger.LogInformation("Room image upload endpoint hit at {Time}", DateTime.UtcNow);

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPatch("update-room/{roomId}")]
        public async Task<IActionResult> UpdateRoom(Guid roomId, [FromBody] UpdateRoomCommand command)
        {

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid ModelState Errors: {@Errors}", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));

                return BadRequest(ModelState);
            }

            if (roomId != command.RoomId)
            {
                return BadRequest("Room ID mismatch.");
            }

            var result = await _mediator.Send(command);

            if (!result)
            {
                return NotFound("Room not found or could not be updated.");
            }

            return NoContent();
        }

        [HttpPost]
        [Route("available-hotels")]
        public async Task<IActionResult> SearchAvailableHotels([FromBody] SearchAvailableHotelsQuery query)
        {
            var hotels = await _mediator.Send(query);
            return Ok(hotels);
        }
        [HttpGet("page/{id}")]
        public async Task<IActionResult> GetHotelDetails(Guid id)
        {
            var result = await _mediator.Send(new GetHotelByIdPageQuery(id));
            return result == null ? NotFound() : Ok(result);
        }


    }
}
