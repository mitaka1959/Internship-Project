using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Reservations.DTOs;

namespace EasyStays.Application.UseCases.Reservations.Queries
{
    public class GetConfirmedReservationsQuery : IRequest<List<HostReservationDto>>
    {
        public string UserId { get; set; }
        public Guid? HotelId { get; set; }
    }
}
