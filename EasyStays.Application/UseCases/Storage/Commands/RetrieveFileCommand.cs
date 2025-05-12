using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;


namespace EasyStays.Application.UseCases.Storage.Commands
{
    public class RetrieveFileCommand: IRequest<List<string>>
    {
        public string ContainerName { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
    }
}
