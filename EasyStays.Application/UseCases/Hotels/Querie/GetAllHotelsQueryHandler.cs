using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using EasyStays.Domain.Entities;
using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.Commands;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    internal class GetAllHotelsQueryHandler: IRequestHandler<GetAllHotelsQuery, List<Hotel>>
    {
        private readonly IHotelRepository _repository;

        public GetAllHotelsQueryHandler(IHotelRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Hotel>> Handle(GetAllHotelsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAllAsync();
        }

    }
}
