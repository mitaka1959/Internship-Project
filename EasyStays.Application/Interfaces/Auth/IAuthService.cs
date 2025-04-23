using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(string userName,string email, string password, string role);
        Task<string> LoginAsync(string userName, string password);
    }
}
