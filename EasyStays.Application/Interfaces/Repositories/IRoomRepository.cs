using EasyStays.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.Interfaces.Repositories
{
    public interface IRoomRepository
    {
        Task<List<Room>> GetAvailableRoomsAsync(Guid hotelId);
    }
}
