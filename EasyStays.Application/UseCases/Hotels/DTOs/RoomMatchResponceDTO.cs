using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class RoomMatchResult
    {
        public List<RoomSelection> SelectedRooms { get; set; } = new List<RoomSelection>();
        public decimal TotalPrice { get; set; }
    }

    public class RoomSelection
    {
        public string RoomName { get; set; }
        public List<BedTypeQuantity> BedTypes { get; set; } = new List<BedTypeQuantity>();
        public int Quantity { get; set; }
        public decimal PricePerRoom { get; set; }
    }

    public class BedTypeQuantity
    {
        public string BedType { get; set; }
        public int Quantity { get; set; }
    }

}
