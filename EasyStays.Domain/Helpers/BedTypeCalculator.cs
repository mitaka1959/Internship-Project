using EasyStays.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Helpers
{
    public static class BedTypeCalculator
    {
        public static int GetCapacity(BedType bedType)
        {
            return bedType switch
            {
                BedType.singleBed => 1,
                BedType.queenSizeBed => 2,
                BedType.kingSizeBed => 2,
                _ => 0
            };
        }
    }
}
