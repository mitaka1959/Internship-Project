using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.Commands;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Interfaces;
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

        public UploadRoomImagesCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<List<string>> Handle(UploadRoomImagesCommand request, CancellationToken cancellationToken)
        {
            var room = await _context.Rooms
                .FirstOrDefaultAsync(r => r.Id == request.RoomId && !r.IsDeleted, cancellationToken);

            if (room == null)
                throw new KeyNotFoundException("Room not found.");

            var uploadedUrls = new List<string>();

            foreach (var image in request.Images)
            {
                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                await _storageService.UploadFileAsync(image.Content, fileName, "room-images");

                var imageUrl = $"https://easystays.blob.core.windows.net/room-images/{fileName}";
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
