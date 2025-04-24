using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Auth;
using EasyStays.Application.Interfaces.Repositories;
using MediatR;
using EasyStays.Application.UseCases.Users.DTOs;


namespace EasyStays.Application.UseCases.Users.Commands
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponse>
    { 
        private readonly IAuthService _authService;  

        public RegisterCommandHandler(IAuthService authService)
        { 
             _authService = authService;
        }
        public async Task<AuthResponse> Handle(RegisterCommand command, CancellationToken cancellation)
        {
            return await _authService.RegisterAsync(
                   command.UserName,
                   command.Password,
                   command.Email,
                   command.Role
                );
        }
    }
}
