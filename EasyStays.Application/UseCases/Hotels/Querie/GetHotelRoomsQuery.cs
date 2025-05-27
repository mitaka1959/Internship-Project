using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetHotelRoomsQuery: IRequest<List<Room>>
    {
        public Guid HotelId { get; set; }

        public GetHotelRoomsQuery(Guid hotelId)
        {
            HotelId = hotelId;
        }
    }
}
