using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Hotels.Commands
{
    public class DeleteHotelCommand: IRequest<Unit>
    {
        public Guid HotelId { get; set; }

        public DeleteHotelCommand(Guid hotelId)
        {
            HotelId = hotelId;
        }
    }
}
