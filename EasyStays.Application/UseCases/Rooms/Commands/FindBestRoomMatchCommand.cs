using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Rooms.Commands
{
    public class FindBestRoomMatchCommand : IRequest<RoomMatchResult>
    {
        public int Adults { get; set; }
        public int Children { get; set; }
        public int? RequestedRooms { get; set; }
        public string HotelId { get; set; }
    }
}
