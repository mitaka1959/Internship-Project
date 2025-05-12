using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Interfaces;

namespace EasyStays.Application.UseCases.Storage.Commands
{
    public class UploadFileCommandHandler: IRequestHandler<UploadFileCommand, string>
    {
        private readonly IStorageService _storageService;

        public UploadFileCommandHandler(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<string> Handle(UploadFileCommand request, CancellationToken cancellationToken)
        {
            await _storageService.UploadFileAsync(request.FileStream, request.FileName, request.ContainerName);
            return "File uploaded successfully";
        }
    }
}
