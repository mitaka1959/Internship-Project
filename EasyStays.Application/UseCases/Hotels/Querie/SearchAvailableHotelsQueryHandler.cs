using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class SearchAvailableHotelsHandler : IRequestHandler<SearchAvailableHotelsQuery, List<HotelCardDto>>
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IRoomMatchingService _roomMatchingService;

        public SearchAvailableHotelsHandler(IHotelRepository hotelRepository, IRoomMatchingService roomMatchingService)
        {
            _hotelRepository = hotelRepository;
            _roomMatchingService = roomMatchingService;
        }

        public async Task<List<HotelCardDto>> Handle(SearchAvailableHotelsQuery query, CancellationToken cancellationToken)
        {
            var hotels = await _hotelRepository.GetHotelsByLocationWithImagesAsync(query.Destination);
            hotels = hotels.Where(h => !h.IsDeleted).ToList();
            var hotelCards = new List<HotelCardDto>();
            
            foreach (var hotel in hotels)
            {
                var matchRequest = new RoomMatchRequest
                {
                    HotelId = hotel.Id.ToString(),
                    Adults = query.Adults,
                    Children = query.Children,
                    RequestedRooms = query.Rooms
                };

                var matchResult = await _roomMatchingService.FindBestRoomMatchAsync(matchRequest);

                if (matchResult != null && matchResult.SelectedRooms.Any())
                {
                    var selectedRoom = matchResult.SelectedRooms.First();

                    var firstImageUrl = hotel.Images.FirstOrDefault()?.ImageUrl;


                    hotelCards.Add(new HotelCardDto
                    {
                        HotelId = hotel.Id.ToString(),
                        Name = hotel.Name,
                        Location = $"{hotel.City}, {hotel.Country}",
                        ImageUrl = firstImageUrl,
                        RoomName = selectedRoom.RoomName,
                        BedTypes = selectedRoom.BedTypes,
                        Quantity = selectedRoom.Quantity,
                        Price = matchResult.TotalPrice,
                        Stars = hotel.Stars
                    });
                }
            }

            return hotelCards;
        }
    }
}
