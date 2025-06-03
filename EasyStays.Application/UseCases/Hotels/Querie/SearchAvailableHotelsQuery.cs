using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class SearchAvailableHotelsQuery : IRequest<List<HotelCardDto>>
    {
        public string Destination { get; set; } = string.Empty;
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public int Rooms { get; set; }
    }

}
