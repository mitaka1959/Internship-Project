using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Enums
{
    public enum ReservationStatus
    {
        Pending = 0,       
        Confirmed = 1,     
        CheckedIn = 2,     
        Completed = 3,     
        Cancelled = 4,     
        NoShow = 5         
    }

}
