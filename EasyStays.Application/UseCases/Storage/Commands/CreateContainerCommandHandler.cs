using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Interfaces;

namespace EasyStays.Application.UseCases.Storage.Commands
{
    public class CreateContainerCommandHandler: IRequestHandler<CreateContainerCommand, string>
    {
        private readonly IStorageService _storageService;

        public CreateContainerCommandHandler(IStorageService storageService)
        {
            _storageService = storageService;
        }
        public async Task<string> Handle(CreateContainerCommand request, CancellationToken cancellationToken)
        {
            return await _storageService.CreateContainerAsync(request.ContainerName);
        }
    }
}
