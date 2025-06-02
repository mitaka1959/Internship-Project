using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class Policy
    {
        public Guid Id { get; set; }
        public string Description { get; set; }

        public ICollection<HotelPolicy> HotelPolicies { get; set; } = new List<HotelPolicy>();
    }
}
