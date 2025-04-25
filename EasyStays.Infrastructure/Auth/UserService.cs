using EasyStays.Application.Interfaces.Auth;
using EasyStays.Application.UseCases.Users.DTOs;
using EasyStays.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace EasyStays.Infrastructure.Auth
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ApplicationUserDTO?> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;

            var roles = await _userManager.GetRolesAsync(user);

            return new ApplicationUserDTO
            {
                Id = user.Id,
                userName = user.UserName,
                Role = roles.FirstOrDefault() ?? string.Empty
            };
        }
    }
}
