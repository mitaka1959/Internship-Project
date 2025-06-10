using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Reservations.Queries
{
    public class GetPendingReservationsForHostQuery : IRequest<List<PendingReservationDto>>
    {
        public Guid? HotelId { get; set; }
    }

    public class PendingReservationDto
    {
        public Guid Id { get; set; }
        public string GuestName { get; set; }
        public string HotelName { get; set; }
        public string RoomName { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
