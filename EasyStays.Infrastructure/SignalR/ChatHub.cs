using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace EasyStays.Infrastructure.SignalR
{
    public class ChatHub: Hub
    {
        private readonly IApplicationDbContext _context;
        public ChatHub(IApplicationDbContext context)
        {
            _context = context;
        }
    }
}
