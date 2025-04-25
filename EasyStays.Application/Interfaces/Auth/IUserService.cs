using EasyStays.Application.UseCases.Users.DTOs;

namespace EasyStays.Application.Interfaces.Auth
{
    public interface IUserService
    {
        Task<ApplicationUserDTO?> GetUserByIdAsync(string userId);
    }
}
