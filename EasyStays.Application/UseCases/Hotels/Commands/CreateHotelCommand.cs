using EasyStays.Domain.Enums;
using MediatR;
using EasyStays.Application.UseCases.Hotels.DTOs;
using System.ComponentModel.DataAnnotations;


public class CreateHotelCommand : IRequest<Guid>
{
    [Required]
    public string OwnerId { get; set; }

    public string Name { get; set; }
    public string HotelType { get; set; }
    public string Description { get; set; }
    public string AddressLine { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public int Stars { get; set; }
    public string ContactEmail { get; set; }
    public string ContactPhone { get; set; }

   
    public string CheckInTime { get; set; }
    public string CheckOutTime { get; set; }
    public string CancelationPolicy { get; set; }
    public List<string> HouseRules { get; set; }

    
    public List<string> Languages { get; set; }
    public List<RoomGroupDto> RoomGroups { get; set; } = new();
}

