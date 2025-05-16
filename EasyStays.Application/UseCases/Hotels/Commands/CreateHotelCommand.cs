using MediatR;

public class CreateHotelCommand : IRequest<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string AddressLine { get; set; }
    public int NumberOfRooms { get; set; }
    public int Stars { get; set; }
    public Guid OwnerId { get; set; }
}

