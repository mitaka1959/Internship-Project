using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Interfaces;
using MediatR;

namespace EasyStays.Application.UseCases.Storage.Commands
{
    public class RetrieverFileCommandHandler: IRequestHandler<RetrieveFileCommand, List<string>>
    {
        private readonly IStorageService _storageService;

        public RetrieverFileCommandHandler(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<List<string>> Handle(RetrieveFileCommand request, CancellationToken cancellationToken)
        {
            var result = await _storageService.RetrieveFilesAsync(request.ContainerName);
            return result;
        }

    }
}
