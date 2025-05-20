using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class UploadHotelImagesCommand : IRequest<List<string>>
    {
        public Guid HotelId { get; set; }

        public List<HotelImageUploadDto> Images { get; set; } = new();
    }
    public class HotelImageUploadDto
    {
        public string FileName { get; set; }
        public Stream Content { get; set; }
    }
}
