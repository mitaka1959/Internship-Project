using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class HotelPolicy
    {
        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public Guid PolicyId { get; set; }
        public Policy Policy { get; set; }
    }

}
