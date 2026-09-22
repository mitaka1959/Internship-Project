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

        // Returns the public URL of the uploaded blob, derived from the
        // connected storage account (no hard-coded account name).
        public Task<string> UploadFileAsync(Stream stream, string fileName, string containerName);

        public Task<List<string>> RetrieveFilesAsync(string containerName);

        // Deletes the blob identified by its full URL. No-op if it doesn't exist.
        public Task DeleteFileAsync(string blobUrl);
    }
}
