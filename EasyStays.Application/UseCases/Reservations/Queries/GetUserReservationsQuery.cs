using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Reservations.DTOs;

namespace EasyStays.Application.UseCases.Reservations.Queries
{
    public class GetUserReservationsQuery : IRequest<List<UserReservationDto>>
    {
        public string UserId { get; set; }
    }
}
