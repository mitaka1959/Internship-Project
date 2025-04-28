using EasyStays.Application.UseCases.Hotels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;



namespace EasyStays.Application.Interfaces.Auth
{
     public interface IJwtProvider
        {
            (string AccessToken, string RefreshToken) GenerateTokens(string userId, string userName,string Email, string role);
            string Generate(IEnumerable<Claim> claims);
        }

    

}
