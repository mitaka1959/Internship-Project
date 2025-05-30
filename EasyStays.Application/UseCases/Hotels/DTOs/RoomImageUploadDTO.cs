using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class RoomImageUpload
    {
        public string FileName { get; set; } = string.Empty;
        public Stream Content { get; set; } = Stream.Null; 
    }

}
