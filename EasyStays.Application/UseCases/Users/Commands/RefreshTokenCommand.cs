using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Users.DTOs;
using MediatR;

namespace EasyStays.Application.UseCases.Users.Commands
{
    public class RefreshTokenCommand : IRequest<AuthResponse>
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
