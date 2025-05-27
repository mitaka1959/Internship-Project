using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using MediatR;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetHotelByIdQuery: IRequest<Hotel>
    {
        public Guid HotelId { get; set; }
        public Guid UserId { get; set; } 

        public GetHotelByIdQuery(Guid hotelId, Guid userId)
        {
            HotelId = hotelId;
            UserId = userId;
        }
    }
}
