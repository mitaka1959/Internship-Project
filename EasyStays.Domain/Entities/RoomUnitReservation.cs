using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class RoomUnitReservation
    {
        public Guid Id { get; set; }

        public Guid RoomUnitId { get; set; }
        public RoomUnit RoomUnit { get; set; }

        public Guid ReservationId { get; set; }
        public Reservation Reservation { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}
