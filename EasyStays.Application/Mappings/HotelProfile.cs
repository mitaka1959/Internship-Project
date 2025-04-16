using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EasyStays.Application.UseCases.Hotels.DTOs;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.Mappings
{
    public class HotelProfile : Profile
    {
        public HotelProfile() 
        {
            CreateMap<CreateHotelDTO, Hotel>();
            CreateMap<Hotel, CreateHotelDTO>();
        }
    }
}
