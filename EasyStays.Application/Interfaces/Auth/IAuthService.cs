using EasyStays.Application.UseCases.Users.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(string userName, string password, string Email, string role);
        Task<AuthResponse> LoginAsync(string userName, string password);

    }
}
