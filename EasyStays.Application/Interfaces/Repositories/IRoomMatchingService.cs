using EasyStays.Application.UseCases.Hotels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.Repositories
{
    public interface IRoomMatchingService
    {
        Task<RoomMatchResult> FindBestRoomMatchAsync(RoomMatchRequest request);
    }

}
