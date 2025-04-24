using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class RefreshToken
    {
            public int Id { get; set; }
            public string UserId { get; set; } = string.Empty;
            public string Token { get; set; } = string.Empty;
            public DateTime ExpirationDate { get; set; }
    }
}


