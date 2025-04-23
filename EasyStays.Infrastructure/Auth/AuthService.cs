using EasyStays.Application.Interfaces.Auth;
using EasyStays.Domain.Entities;
using EasyStays.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace EasyStays.Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<string> RegisterAsync(string userName, string password, string email , string role)
        {
            var existingUser = await _userManager.FindByNameAsync(userName);
            if (existingUser != null)
                return "User already exists.";

            var newUser = new ApplicationUser
            {
                UserName = userName,
                Email = email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(newUser, password);
            if (!result.Succeeded)
            {
                var errorMessages = string.Join("; ", result.Errors.Select(e => e.Description));
                return $"Failed to create user: {errorMessages}";
            }
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
            await _userManager.AddToRoleAsync(newUser, role);

            return "User registered successfully.";
        }
        public async Task<string> LoginAsync(string userName, string password)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if(user == null)
            {
                return "There is no such user";
            }
            var result = await _userManager.CheckPasswordAsync(user, password);
            if (!result)
            {
                return "Invalid email or password.";
            }
            var roles = await _userManager.GetRolesAsync(user);

            return $"Login successful. User: {user.UserName}, Role: {string.Join(", ", roles)}";
        }
    }
}
