using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class HotelAmenity
    {
        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public Guid AmenityId { get; set; }
        public Amenity Amenity { get; set; }
    }

}
