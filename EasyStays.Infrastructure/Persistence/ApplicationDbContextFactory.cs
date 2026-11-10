using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace EasyStays.Infrastructure.Persistence
{
    // Used only by the EF Core tools (dotnet ef / Update-Database), so migrations can
    // run with EasyStays.Infrastructure as the startup project. It reads the connection
    // string from the same places the web app does in Development.
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        // Same value as <UserSecretsId> in EasyStays.Presentation.csproj
        private const string PresentationUserSecretsId = "dc6e8138-3636-4d73-990c-860345745d40";

        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

            // The EF tools run with the startup project's folder as the current directory.
            var presentationPath = Path.GetFullPath(
                Path.Combine(Directory.GetCurrentDirectory(), "..", "EasyStays.Presentation"));

            var configuration = new ConfigurationBuilder()
                .SetBasePath(presentationPath)
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true)
                .AddUserSecrets(PresentationUserSecretsId)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(connectionString))
                throw new InvalidOperationException(
                    $"ConnectionStrings:DefaultConnection is empty. Checked the appsettings files in " +
                    $"{presentationPath}, user secrets and environment variables.");

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            return new ApplicationDbContext(options);
        }
    }
}
