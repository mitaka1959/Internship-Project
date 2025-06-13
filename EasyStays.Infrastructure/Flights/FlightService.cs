using EasyStays.Application.Interfaces.Flights;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EasyStays.Application.UseCases.Flights.CityCodeMappings; 

namespace EasyStays.Infrastructure.Flights
{
    public class FlightService : IFlightService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public FlightService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetAccessTokenAsync()
        {
            var clientId = _configuration["Amadeus:ClientId"];
            var clientSecret = _configuration["Amadeus:ClientSecret"];

            var requestBody = new StringContent(
                $"grant_type=client_credentials&client_id={clientId}&client_secret={clientSecret}",
                Encoding.UTF8,
                "application/x-www-form-urlencoded");

            var response = await _httpClient.PostAsync("https://test.api.amadeus.com/v1/security/oauth2/token", requestBody);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);

            return json.RootElement.GetProperty("access_token").GetString();
        }

        public async Task<string> GetFlightOffersAsync(string origin, string destination, string departureDate, int adults)
        {
            var accessToken = await GetAccessTokenAsync();

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            
            var originCode = CityCodeMappings.CityCodeToName.ContainsKey(origin)
                ? origin
                : CityCodeMappings.CityCodeToName.ContainsValue(origin)
                    ? CityCodeMappings.CityCodeToName.FirstOrDefault(x => x.Value == origin).Key
                    : origin;

            var destinationCode = CityCodeMappings.CityCodeToName.ContainsKey(destination)
                ? destination
                : CityCodeMappings.CityCodeToName.ContainsValue(destination)
                    ? CityCodeMappings.CityCodeToName.FirstOrDefault(x => x.Value == destination).Key
                    : destination;

            
            var url = $"https://test.api.amadeus.com/v2/shopping/flight-offers" +
                      $"?originLocationCode={originCode}" +
                      $"&destinationLocationCode={destinationCode}" +
                      $"&departureDate={departureDate}" +
                      $"&adults={adults}" +
                      $"&max=5";

            var response = await _httpClient.GetAsync(url);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}
