using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using MediatR;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetRoomByIdQuery: IRequest<Room>
    {
        public Guid RoomId { get; set; }

        public GetRoomByIdQuery(Guid roomId) 
        {
            RoomId = roomId;
        }
    }
}
