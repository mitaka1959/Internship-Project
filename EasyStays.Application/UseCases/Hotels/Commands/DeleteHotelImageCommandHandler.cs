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
    public class DeleteHotelImageCommandHandler : IRequestHandler<DeleteHotelImageCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;
        private readonly ICurrentUserService _currentUser;

        public DeleteHotelImageCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService,
            ICurrentUserService currentUser)
        {
            _context = context;
            _storageService = storageService;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(DeleteHotelImageCommand request, CancellationToken cancellationToken)
        {
            // Only the owner of the image's hotel may delete it; anyone else gets "not found".
            var userId = _currentUser.UserId;
            var image = await _context.HotelImages
                .FirstOrDefaultAsync(i => i.Id == request.ImageId
                                          && i.Hotel.OwnerId == userId, cancellationToken);

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
