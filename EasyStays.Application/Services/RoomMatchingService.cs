using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using EasyStays.Domain.Entities;
using EasyStays.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyStays.Application.Services
{
    public class RoomMatchingService : IRoomMatchingService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomMatchingService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<RoomMatchResult> FindBestRoomMatchAsync(RoomMatchRequest request)
        {
            var hotelGuid = Guid.Parse(request.HotelId!);
            var availableRooms = await _roomRepository.GetAvailableRoomsAsync(hotelGuid);

            var availableRoomCapacities = availableRooms
                .Select(r => new
                {
                    Room = r,
                    Capacity = CaltulateRoomCapacity.CalculateRoomCapacity(r)
                })
                .OrderBy(r => r.Room.PricePerNight)
                .ToList();

            int totalGuests = request.Adults + request.Children;

            
            var singleRoomMatch = availableRoomCapacities
                .FirstOrDefault(r => r.Capacity >= totalGuests);

            if (singleRoomMatch != null)
            {
                var singleRoomSelection = new RoomSelection
                {
                    RoomName = singleRoomMatch.Room.DisplayName,
                    Quantity = 1,
                    BedTypes = singleRoomMatch.Room.BedConfigurations
                        .GroupBy(bc => bc.BedType)
                        .Select(g => new BedTypeQuantity
                        {
                            BedType = g.Key.ToString(),
                            Quantity = g.Sum(bc => bc.Quantity)
                        })
                        .ToList(),
                    PricePerRoom = singleRoomMatch.Room.PricePerNight
                };

                return new RoomMatchResult
                {
                    SelectedRooms = new List<RoomSelection> { singleRoomSelection },
                    TotalPrice = singleRoomMatch.Room.PricePerNight
                };
            }

          
            var selectedRooms = new List<Room>();
            var remainingGuests = totalGuests;

            foreach (var room in availableRoomCapacities)
            {
                while (remainingGuests >= room.Capacity)
                {
                    selectedRooms.Add(room.Room);
                    remainingGuests -= room.Capacity;
                }

                if (remainingGuests == 0)
                    break;
            }

            if (remainingGuests > 0)
            {
                
                return new RoomMatchResult
                {
                    SelectedRooms = new List<RoomSelection>(),
                    TotalPrice = 0
                };
            }

            // Group selected rooms by type for RoomSelection
            var selectedRoomDtos = selectedRooms
                .GroupBy(r => r.DisplayName)
                .Select(group => new RoomSelection
                {
                    RoomName = group.Key,
                    Quantity = group.Count(),
                    BedTypes = group.First().BedConfigurations
                        .GroupBy(bc => bc.BedType)
                        .Select(g => new BedTypeQuantity
                        {
                            BedType = g.Key.ToString(),
                            Quantity = g.Sum(bc => bc.Quantity)
                        })
                        .ToList(),
                    PricePerRoom = group.First().PricePerNight
                })
                .ToList();

            var totalPrice = selectedRoomDtos.Sum(sr => sr.PricePerRoom * sr.Quantity);

            return new RoomMatchResult
            {
                SelectedRooms = selectedRoomDtos,
                TotalPrice = totalPrice
            };
        }
    }
}
