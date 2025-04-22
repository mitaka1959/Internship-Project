using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Domain.Entities;
using MediatR;

public class CreateHotelCommandHandler : IRequestHandler<CreateHotelCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateHotelCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
    {
        var hotel = new Hotel
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            City = request.City,
            Country = request.Country,
            AddressLine = request.AddressLine,
            NumberOfRooms = request.NumberOfRooms,
            Stars = request.Stars,
            PricePerNight = request.PricePerNight,
            IsApproved = false,
            OwnerId = request.OwnerId
        };

        _context.Hotels.Add(hotel);
        await _context.SaveChangesAsync(cancellationToken);

        return hotel.Id;
    }
}
