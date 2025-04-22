using AutoMapper;
using EasyStays.Application.UseCases.Hotels.DTOs;
using EasyStays.Domain.Entities;

namespace EasyStays.Application.Mappings
{
    public class HotelProfile : Profile
    {
        public HotelProfile()
        {
            CreateMap<CreateHotelDTO, Hotel>()
                .ForMember(dest => dest.IsApproved, opt => opt.Ignore())
                .ForMember(dest => dest.Images, opt => opt.Ignore())
                .ForMember(dest => dest.HotelAmenities, opt => opt.Ignore())
                .ForMember(dest => dest.Rooms, opt => opt.Ignore())
                .ForMember(dest => dest.Reservations, opt => opt.Ignore())
                .ForMember(dest => dest.Reviews, opt => opt.Ignore());

            CreateMap<Hotel, CreateHotelDTO>();
            CreateMap<Hotel, HotelDto>();

        }
    }
}
