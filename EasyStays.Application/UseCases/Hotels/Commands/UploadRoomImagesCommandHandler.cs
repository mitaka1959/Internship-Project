using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.Commands;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Interfaces;
using EasyStays.Application.Interfaces.Auth;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Rooms.Commands
{
    public class UploadRoomImagesCommandHandler : IRequestHandler<UploadRoomImagesCommand, List<string>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;
        private readonly ICurrentUserService _currentUser;

        public UploadRoomImagesCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService,
            ICurrentUserService currentUser)
        {
            _context = context;
            _storageService = storageService;
            _currentUser = currentUser;
        }

        public async Task<List<string>> Handle(UploadRoomImagesCommand request, CancellationToken cancellationToken)
        {
            // Only the owner of the room's hotel may upload; anyone else gets "not found".
            var userId = _currentUser.UserId;
            var room = await _context.Rooms
                .FirstOrDefaultAsync(r => r.Id == request.RoomId
                                          && !r.IsDeleted
                                          && r.Hotel.OwnerId == userId, cancellationToken);

            if (room == null)
                throw new KeyNotFoundException("Room not found.");

            var uploadedUrls = new List<string>();

            foreach (var image in request.Images)
            {
                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                var imageUrl = await _storageService.UploadFileAsync(image.Content, fileName, "room-images");
                uploadedUrls.Add(imageUrl);

                _context.RoomImages.Add(new RoomImage
                {
                    RoomId = request.RoomId,
                    ImageUrl = imageUrl,
                    UploadedAt = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync(cancellationToken);

            return uploadedUrls;
        }
    }
}
