using EasyStays.Application.Interfaces.Auth;
using EasyStays.Application.UseCases.Users.DTOs;
using EasyStays.Domain.Entities;
using EasyStays.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;


namespace EasyStays.Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IJwtProvider _jwtProvider;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IJwtProvider jwtProvider)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtProvider = jwtProvider;
        }

        public async Task<AuthResponse> RegisterAsync(string userName, string password, string email, string role)
        {
            var existingUser = await _userManager.FindByNameAsync(userName);
            if (existingUser != null)
            {
                return new AuthResponse { Token = "User already exists." };
            }

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
                return new AuthResponse { Token = $"Failed to create user: {errorMessages}" };
            }

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            await _userManager.AddToRoleAsync(newUser, role);

            var tokens = _jwtProvider.GenerateTokens(newUser.Id, newUser.UserName, newUser.Email, role);
            var accessToken = tokens.AccessToken;
            var refreshToken = tokens.RefreshToken;

            return new AuthResponse
            {
                UserName = newUser.UserName,
                Email = newUser.Email,
                Role = role,
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponse> LoginAsync(string userName, string password)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return new AuthResponse { Token = "There is no such user." };
            }

            var result = await _userManager.CheckPasswordAsync(user, password);
            if (!result)
            {
                return new AuthResponse { Token = "Invalid username or password." };
            }

            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? string.Empty;
            var tokens = _jwtProvider.GenerateTokens(user.Id, user.UserName, user.Email, role);
            var accessToken = tokens.AccessToken;
            var refreshToken = tokens.RefreshToken;

            return new AuthResponse
            {
                UserName = user.UserName,
                Email = user.Email,
                Role = role,
                Token = accessToken,
                RefreshToken = refreshToken
            };

        }
    }
}
