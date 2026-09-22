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
    public class DeleteRoomImageCommandHandler : IRequestHandler<DeleteRoomImageCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public DeleteRoomImageCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<Unit> Handle(DeleteRoomImageCommand request, CancellationToken cancellationToken)
        {
            var image = await _context.RoomImages
                .FirstOrDefaultAsync(i => i.Id == request.ImageId, cancellationToken);

            if (image == null)
                throw new KeyNotFoundException("Room image not found.");

            // Remove the blob first (no-ops if it's already gone), then the DB row.
            await _storageService.DeleteFileAsync(image.ImageUrl);

            _context.RoomImages.Remove(image);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
