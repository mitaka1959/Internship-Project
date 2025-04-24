using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Users.DTOs;

namespace EasyStays.Application.UseCases.Users.Commands
{
    public class LoginCommand : IRequest<AuthResponse>
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
