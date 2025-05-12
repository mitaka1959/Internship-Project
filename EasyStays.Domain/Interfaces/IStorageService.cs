using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Interfaces
{
    public interface IStorageService
    {
        public Task<string> CreateContainerAsync(string containerName);
        public Task UploadFileAsync(Stream stream, string fileName, string containerName);
        public Task<List<string>> RetrieveFilesAsync(string containerName);
    }
}
