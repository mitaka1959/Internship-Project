using Microsoft.AspNetCore.Mvc;
using MediatR;
using EasyStays.Application.UseCases.Storage.Commands;


namespace EasyStays.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StorageController: ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<StorageController> _logger;

        public StorageController(IMediator mediator, ILogger<StorageController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost("create-container")]
        public async Task<IActionResult> CreateContainer([FromBody] CreateContainerCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new { message = result });
        }

        [HttpPost("upload-file")]
        public async Task<IActionResult> UploadFile(IFormFile file, [FromQuery] string containerName)

        {
            using var stream = file.OpenReadStream();
            var command = new UploadFileCommand(stream, file.FileName, containerName);
            var result = await _mediator.Send(command);
            return Ok(new { message = result });
        }

        [HttpGet("retrieve-file")]
        public async Task<IActionResult> RetrieveFile([FromQuery] RetrieveFileCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new { message = result });
        }
    }
}
  