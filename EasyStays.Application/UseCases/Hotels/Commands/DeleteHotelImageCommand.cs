using MediatR;
using System;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class DeleteHotelImageCommand : IRequest<Unit>
    {
        public Guid ImageId { get; set; }

        public DeleteHotelImageCommand(Guid imageId)
        {
            ImageId = imageId;
        }
    }
}
