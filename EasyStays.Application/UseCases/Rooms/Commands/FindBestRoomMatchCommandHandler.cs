using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Rooms.Commands
{
    public class FindBestRoomMatchHandler : IRequestHandler<FindBestRoomMatchCommand, RoomMatchResult>
    {
        private readonly IRoomMatchingService _roomMatchingService;

        public FindBestRoomMatchHandler(IRoomMatchingService roomMatchingService)
        {
            _roomMatchingService = roomMatchingService;
        }

        public async Task<RoomMatchResult> Handle(FindBestRoomMatchCommand request, CancellationToken cancellationToken)
        {
            return await _roomMatchingService.FindBestRoomMatchAsync(new RoomMatchRequest
            {
                Adults = request.Adults,
                Children = request.Children,
                RequestedRooms = request.RequestedRooms,
                HotelId = request.HotelId
            });
        }
    }

}
