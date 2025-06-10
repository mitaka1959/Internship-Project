using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Reservations.Commands
{
    public class AcceptReservationCommand : IRequest<string>
    {
        public Guid ReservationId { get; set; }

        public AcceptReservationCommand(Guid reservationId)
        {
            ReservationId = reservationId;
        }
    }
}
