using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class Review
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Body { get; set; }
        public float Rating { get; set; }
    }
}
