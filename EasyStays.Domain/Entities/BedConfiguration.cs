using EasyStays.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
        public class BedConfiguration
        {
            public Guid Id { get; set; }
            public Guid RoomId { get; set; }
            public Room Room { get; set; }

            public BedType BedType { get; set; } 
            public int Quantity { get; set; }
        }
    
}
