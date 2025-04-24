using EasyStays.Application.UseCases.Hotels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace EasyStays.Application.Interfaces.Auth
{
    public interface IJwtProvider
    {
        string Generate(string userId, string userName, string email, string role);
    }

}
