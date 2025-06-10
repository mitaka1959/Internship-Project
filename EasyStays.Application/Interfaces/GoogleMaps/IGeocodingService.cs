using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.GoogleMaps
{
    public interface IGeocodingService
    {
        Task<(double? lat, double? lng)> GeocodeAddressAsync(string address);
    }
}
