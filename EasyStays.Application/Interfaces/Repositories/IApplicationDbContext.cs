using EasyStays.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using Microsoft.EntityFrameworkCore;


namespace EasyStays.Application.Interfaces.Repositories
{
    public interface IApplicationDbContext
    {
        DbSet<Hotel> Hotels { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }

}
