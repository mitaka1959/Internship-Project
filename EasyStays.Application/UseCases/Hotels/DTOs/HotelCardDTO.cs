using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class HotelCardDto
    {
        public string HotelId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public string RoomName { get; set; }
        public List<BedTypeQuantity> BedTypes { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int Stars { get; set; }
    }

}
