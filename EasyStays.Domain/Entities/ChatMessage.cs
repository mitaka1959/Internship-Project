using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }

        public string SenderId { get; set; } 
        public string RecipientId { get; set; }  

        public Guid ReservationId { get; set; }
        public Reservation Reservation { get; set; }

        public string Content { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
