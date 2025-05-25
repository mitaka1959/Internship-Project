using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetMyHotelsQueryHandler: IRequestHandler<GetMyHotelsQuery, List<Hotel>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public GetMyHotelsQueryHandler(IApplicationDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }
        public async Task<List<Hotel>> Handle(GetMyHotelsQuery query, CancellationToken cancellationToken)
        {
            return await _context.Hotels
                .Include(h => h.Images)
                .Include(h => h.Rooms).ThenInclude(r => r.RoomUnits)
                .Where(h => h.OwnerId == query.UserId && h.IsDeleted == false)
                .ToListAsync(cancellationToken);
        }


    }
}
