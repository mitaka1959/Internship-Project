using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Entities;
using EasyStays.Application.UseCases.Hotels.DTOs;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetMyHotelsQuery : IRequest<List<Hotel>>
    {
        public string UserId { get; }

        public GetMyHotelsQuery(string userId)
        {
            UserId = userId;
        }
    }

}
