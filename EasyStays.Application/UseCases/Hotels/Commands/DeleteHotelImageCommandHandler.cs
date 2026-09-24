using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class DeleteHotelImageCommandHandler : IRequestHandler<DeleteHotelImageCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public DeleteHotelImageCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<Unit> Handle(DeleteHotelImageCommand request, CancellationToken cancellationToken)
        {
            var image = await _context.HotelImages
                .FirstOrDefaultAsync(i => i.Id == request.ImageId, cancellationToken);

            if (image == null)
                throw new KeyNotFoundException("Hotel image not found.");

            // Remove the blob first (no-ops if it's already gone), then the DB row.
            await _storageService.DeleteFileAsync(image.ImageUrl);

            _context.HotelImages.Remove(image);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
