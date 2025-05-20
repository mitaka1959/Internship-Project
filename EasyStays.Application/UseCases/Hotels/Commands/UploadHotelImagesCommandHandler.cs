using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Interfaces;
using MediatR;
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

        public UploadHotelImagesCommandHandler(
            IApplicationDbContext context,
            IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<List<string>> Handle(UploadHotelImagesCommand request, CancellationToken cancellationToken)
        {
            var uploadedUrls = new List<string>();

            foreach (var image in request.Images)
            {
                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                await _storageService.UploadFileAsync(image.Content, fileName, "hotel-container");

                var imageUrl = $"https://easystays.blob.core.windows.net/hotel-container/{fileName}";
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
