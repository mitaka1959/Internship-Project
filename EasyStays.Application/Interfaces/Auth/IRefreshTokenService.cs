using EasyStays.Domain.Entities;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.Auth
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken?> GetRefreshTokenAsync(string token);
        Task SaveRefreshTokenAsync(string userId, string refreshToken);
    }
}
