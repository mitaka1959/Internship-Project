using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Auth;
using MediatR;
using EasyStays.Application.UseCases.Users.DTOs;


namespace EasyStays.Application.UseCases.Users.Commands
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthResponse>
    {
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IUserService _userAccountService;
        private readonly IJwtProvider _jwtProvider;

        public RefreshTokenCommandHandler(IRefreshTokenService refreshTokenService, IUserService userAccountService, IJwtProvider jwtProvider)
        {
            _refreshTokenService = refreshTokenService;
            _userAccountService = userAccountService;
            _jwtProvider = jwtProvider;
        }
        public async Task<AuthResponse> Handle(RefreshTokenCommand refreshTokenCommand, CancellationToken cancellationToken)
        {
            var tokenRecord = await _refreshTokenService.GetRefreshTokenAsync(refreshTokenCommand.RefreshToken);
            if (tokenRecord == null || tokenRecord.ExpirationDate < DateTime.UtcNow)
            {
                return new AuthResponse { Token = "Invalid or expired refresh token." };
            }
            var user = await _userAccountService.GetUserByIdAsync(tokenRecord.UserId);
            if (user == null)
            {
                return new AuthResponse { Token = "User not found." };
            }
            var (accessToken, newRefreshToken) = _jwtProvider.GenerateTokens(user.Id, user.userName,user.Email, user.Role);
            await _refreshTokenService.SaveRefreshTokenAsync(user.Id, newRefreshToken);

            return new AuthResponse
            {
                UserName = user.userName,
                Role = user.Role,
                Token = accessToken,
                RefreshToken = newRefreshToken
            };
        }

    }

}
