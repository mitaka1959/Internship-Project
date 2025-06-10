using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Hotels.DTOs;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetMyHotelsDropdownQuery : IRequest<List<HotelDropdownDto>>
    {
        public string UserId { get; set; } = string.Empty;
    }
}
