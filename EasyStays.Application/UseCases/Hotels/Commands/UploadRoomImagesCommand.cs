using EasyStays.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class UploadRoomImagesCommand : IRequest<List<string>>
    {
        public Guid RoomId { get; set; }
        public List<RoomImageUpload> Images { get; set; } = new();
    }

    public class RoomImageUpload
    {
        public string FileName { get; set; }
        public Stream Content { get; set; }
    }

}

