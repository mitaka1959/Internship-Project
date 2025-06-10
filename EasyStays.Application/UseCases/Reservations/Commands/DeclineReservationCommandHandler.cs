using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Reservations.Commands
{
    public class DeclineReservationCommandHandler : IRequestHandler<DeclineReservationCommand, string>
    {
        private readonly IApplicationDbContext _context;

        public DeclineReservationCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(DeclineReservationCommand request, CancellationToken cancellationToken)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.Id == request.ReservationId, cancellationToken);

            if (reservation == null)
                throw new InvalidOperationException("Reservation not found.");

            if (reservation.Status != ReservationStatus.Pending)
                throw new InvalidOperationException("Only pending reservations can be declined.");

            reservation.Status = ReservationStatus.Cancelled;

            await _context.SaveChangesAsync(cancellationToken);

            return reservation.ReservationNumber;
        }
    }
}
