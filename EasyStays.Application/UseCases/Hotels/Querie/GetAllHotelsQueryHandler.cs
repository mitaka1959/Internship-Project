using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Entities;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels;
using AutoMapper;
using EasyStays.Application.UseCases.Hotels.DTOs;
using Microsoft.EntityFrameworkCore;


namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetAllHotelsQueryHandler : IRequestHandler<GetAllHotelsQuery, List<HotelDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllHotelsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<HotelDto>> Handle(GetAllHotelsQuery request, CancellationToken cancellationToken)
        {
            var hotels = await _context.Hotels
                .Where(h => h.IsDeleted == false)
                .ToListAsync(cancellationToken);
            return _mapper.Map<List<HotelDto>>(hotels);
        }
    }

}
