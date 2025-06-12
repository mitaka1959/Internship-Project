using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Reservations.DTOs;

namespace EasyStays.Application.Interfaces.Email
{
    public interface IBookingConfirmationPdfGenerator
    {
        byte[] Generate(BookingConfirmationDto dto);
    }
}
