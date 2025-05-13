using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class RoomImage
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }

        public string ImageUrl { get; set; }
        public bool IsMain { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
