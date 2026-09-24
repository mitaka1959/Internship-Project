using MediatR;
using System;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class DeleteRoomImageCommand : IRequest<Unit>
    {
        public Guid ImageId { get; set; }

        public DeleteRoomImageCommand(Guid imageId)
        {
            ImageId = imageId;
        }
    }
}
