using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Interfaces;
using EasyStays.Application.Interfaces.Auth;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class UploadHotelImagesCommandHandler : IRequestHandler<UploadHotelImagesCommand, List<string>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IStorageService _storageService;
        private readonly ICurrentUserService _currentUser;

        public UploadHotelImagesCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService,
            ICurrentUserService currentUser)
        {
            _context = context;
            _storageService = storageService;
            _currentUser = currentUser;
        }

        public async Task<List<string>> Handle(UploadHotelImagesCommand request, CancellationToken cancellationToken)
        {
            // Check ownership before anything is uploaded to blob storage.
            // A hotel the user doesn't own is reported as "not found".
            var userId = _currentUser.UserId;
            var ownsHotel = await _context.Hotels.AnyAsync(
                h => h.Id == request.HotelId && !h.IsDeleted && h.OwnerId == userId,
                cancellationToken);

            if (!ownsHotel)
                throw new KeyNotFoundException("Hotel not found.");

            var uploadedUrls = new List<string>();

            foreach (var image in request.Images)
            {
                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                var imageUrl = await _storageService.UploadFileAsync(image.Content, fileName, "hotel-container");
                uploadedUrls.Add(imageUrl);

                _context.HotelImages.Add(new HotelImage
                {
                    HotelId = request.HotelId,
                    ImageUrl = imageUrl,
                    IsMain = false,
                    UploadedAt = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync(cancellationToken);
            return uploadedUrls;
        }
    }
}
