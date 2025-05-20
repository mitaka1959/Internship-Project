using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Interfaces;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using System.Xml.Linq;
using Microsoft.AspNetCore.StaticFiles;

namespace EasyStays.Infrastructure.BlopStorage
{
    public class StorageService : IStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;

        public StorageService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

        public async Task<string> CreateContainerAsync(string containerName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();
            return containerClient.Uri.ToString();
        }
        public async Task UploadFileAsync(Stream stream, string fileName, string containerName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();

            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(stream, overwrite: true);
        }
        public async Task<List<string>> RetrieveFilesAsync(string containerName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            List<string> blobUrls = new List<string>();

            await foreach (BlobItem blob in containerClient.GetBlobsAsync())
            {
                blobUrls.Add(containerClient.GetBlobClient(blob.Name).Uri.ToString());
            }

            return blobUrls;
        }

    }
}
