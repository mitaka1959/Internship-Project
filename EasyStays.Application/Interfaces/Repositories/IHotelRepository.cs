using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.Interfaces.Repositories
{
    public interface IHotelRepository
    {
        Task AddAsync(Hotel hotel);
        Task<List<Hotel>> GetAllAsync();
       

    }

}