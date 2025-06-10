using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetMyHotelsDropdownQueryHandler : IRequestHandler<GetMyHotelsDropdownQuery, List<HotelDropdownDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetMyHotelsDropdownQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<HotelDropdownDto>> Handle(GetMyHotelsDropdownQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.Hotels
                .Where(h => h.OwnerId == request.UserId)
                .Where(h => h.IsDeleted == false)
                .Select(h => new HotelDropdownDto
                {
                    Id = h.Id,
                    Name = h.Name
                })
                .ToListAsync(cancellationToken);
        }
    }
}
