using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.UseCases.Flights.CityCodeMappings
{
    public static class CityCodeMappings
    {
        public static readonly Dictionary<string, string> CityCodeToName = new()
    {
            { "SOF", "Sofia" },
            { "ROM", "Rome" },
            { "FCO", "Rome" },
            { "CIA", "Rome" },
            { "LON", "London" },
            { "LHR", "London" },
            { "LGW", "London" },
            { "CDG", "Paris" },
            { "ORY", "Paris" },
            { "BER", "Berlin" },
            { "TXL", "Berlin" },
            { "AMS", "Amsterdam" },
            { "IST", "Istanbul" },
            { "SAW", "Istanbul" },
            { "ATH", "Athens" },
            { "FRA", "Frankfurt" },
            { "MUC", "Munich" },
            { "MAD", "Madrid" },
            { "BCN", "Barcelona" },
            { "ZRH", "Zurich" },
            { "VIE", "Vienna" },
            { "BRU", "Brussels" },
            { "CPH", "Copenhagen" },
            { "HEL", "Helsinki" }

    };
    }
}

