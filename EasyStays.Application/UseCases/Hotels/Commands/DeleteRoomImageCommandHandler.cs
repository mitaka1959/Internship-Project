using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Auth;
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
        private readonly ICurrentUserService _currentUser;

        public DeleteRoomImageCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService,
            ICurrentUserService currentUser)
        {
            _context = context;
            _storageService = storageService;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(DeleteRoomImageCommand request, CancellationToken cancellationToken)
        {
            // Only the owner of the room's hotel may delete it; anyone else gets "not found".
            var userId = _currentUser.UserId;
            var image = await _context.RoomImages
                .FirstOrDefaultAsync(i => i.Id == request.ImageId
                                          && i.Room.Hotel.OwnerId == userId, cancellationToken);

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
