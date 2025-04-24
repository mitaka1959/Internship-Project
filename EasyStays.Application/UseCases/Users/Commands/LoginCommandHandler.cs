using EasyStays.Application.Interfaces.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Application.UseCases.Users.DTOs;

namespace EasyStays.Application.UseCases.Users.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponse>
    {
        private readonly IAuthService _authService;

        public LoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<AuthResponse> Handle(LoginCommand command, CancellationToken cancellation)
        {
            return await _authService.LoginAsync(
                   command.UserName,
                   command.Password
                   );
        }
    }
}
