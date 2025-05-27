using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using MediatR;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetHotelByIdQueryHandler: IRequestHandler<GetHotelByIdQuery, Hotel>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public GetHotelByIdQueryHandler(IApplicationDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<Hotel> Handle(GetHotelByIdQuery request, CancellationToken cancellationToken)
        {
            var hotel = await _context.Hotels
                .Include(h => h.Images)
                .Include(h => h.Rooms).ThenInclude(r => r.Images)
                .Include(h => h.Rooms).ThenInclude(r => r.RoomUnits)
                .Include(h => h.HotelAmenities)
                .ThenInclude(ha => ha.Amenity) 
                .FirstOrDefaultAsync(
                    h => h.Id == request.HotelId &&
                         !h.IsDeleted &&
                         h.OwnerId == request.UserId.ToString(),
                    cancellationToken);


            return hotel ?? throw new KeyNotFoundException("Hotel not found");
        }
    }
}
