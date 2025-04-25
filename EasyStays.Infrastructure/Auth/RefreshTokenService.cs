using EasyStays.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using EasyStays.Application.Interfaces.Auth;


namespace EasyStays.Infrastructure.Auth
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly ApplicationDbContext _context;

        public RefreshTokenService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string token)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(r => r.Token == token);
        }

        public async Task SaveRefreshTokenAsync(string UserId, string refreshToken)
        {
            var refreshTokenRecord = new RefreshToken
            {
                UserId = UserId,
                Token = refreshToken,
                ExpirationDate = DateTime.UtcNow.AddDays(30) 
            };
            _context.RefreshTokens.Add(refreshTokenRecord);
            await _context.SaveChangesAsync();
        }
    }
}
