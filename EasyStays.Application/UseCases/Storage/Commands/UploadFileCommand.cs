using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using MediatR;

namespace EasyStays.Application.UseCases.Storage.Commands
{
    public class UploadFileCommand : IRequest<string>
    {
        [System.Text.Json.Serialization.JsonIgnore]
        public Stream FileStream { get; private set; }

        public string FileName { get; private set; }
        public string ContainerName { get; private set; }

        public UploadFileCommand(Stream fileStream, string fileName, string containerName)
        {
            FileStream = fileStream;
            FileName = fileName;
            ContainerName = containerName;
        }
    }


}
