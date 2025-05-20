using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetMyHotelsQueryHandler: IRequestHandler<GetMyHotelsQuery, List<Hotel>>
    {
        private readonly IApplicationDbContext _context;

        public GetMyHotelsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Hotel>> Handle(GetMyHotelsQuery query, CancellationToken cancellationToken)
        {
            return await _context.Hotels
                .Where(h => h.OwnerId == query.UserId)
                .ToListAsync(cancellationToken);
        }
    }
}
