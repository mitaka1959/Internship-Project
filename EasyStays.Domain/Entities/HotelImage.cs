using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class HotelImage
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public string ImageUrl { get; set; }
        public bool IsMain { get; set; }
        public DateTime UploadedAt { get; set; }
    }

}
