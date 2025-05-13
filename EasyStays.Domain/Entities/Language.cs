using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class Language
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
    }

}
