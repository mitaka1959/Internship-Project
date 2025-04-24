using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Application.UseCases.Users.DTOs;

namespace EasyStays.Application.UseCases.Users.Commands
{
    public class RegisterCommand : IRequest<AuthResponse>
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Guest";
    }
}
