using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain.Entities
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid ReservationId { get; set; }
        public Reservation Reservation { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public DateTime PaidAt { get; set; }
        public string Status { get; set; } 
        public string PaymentMethod { get; set; } 
        public string? TransactionId { get; set; }
    }

}
