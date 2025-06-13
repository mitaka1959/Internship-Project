using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.Flights
{
    public interface IFlightService
    {
        Task<string> GetFlightOffersAsync(string origin, string destination, string departureDate, int adults);
    }
}
