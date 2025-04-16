using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using EasyStays.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using MediatR;


namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class CreateHotelCommandHandler : IRequestHandler<CreateHotelCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateHotelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
        {
            var hotel = new Hotel
            {
                Name = request.Name,
                City = request.City,
                Country = request.Country,
                Description = request.Description,
                NumberOfRooms = request.NumberOfRooms,
                Stars = request.Stars
            };


            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync(cancellationToken);

            return hotel.Id;
        }
    }


}
