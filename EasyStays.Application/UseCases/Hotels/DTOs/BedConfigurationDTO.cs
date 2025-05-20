using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class BedConfigurationDto
    {
        public int Single { get; set; } = 0;
        public int Queen { get; set; } = 0;
        public int King { get; set; } = 0;
    }
}
