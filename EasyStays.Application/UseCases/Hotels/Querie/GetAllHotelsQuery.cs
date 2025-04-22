using MediatR;
using EasyStays.Application.UseCases.Hotels.DTOs;
using System.Collections.Generic;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetAllHotelsQuery : IRequest<List<HotelDto>>
    {
    }
}
