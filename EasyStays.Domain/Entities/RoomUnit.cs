using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class RoomUnit
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }

        public string? Number { get; set; } 

        public bool IsAvailable { get; set; } = true;
    }

}
