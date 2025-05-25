using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class DeleteHotelCommandHandler: IRequestHandler<DeleteHotelCommand, Unit>
    {
        private readonly IApplicationDbContext _context;

        public DeleteHotelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteHotelCommand request, CancellationToken cancellationToken)
        {
            var hotel = await _context.Hotels
                .FirstOrDefaultAsync(h => h.Id == request.HotelId, cancellationToken);

            if (hotel == null)
                throw new Exception("Hotel not found");

            hotel.IsDeleted = true;
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
