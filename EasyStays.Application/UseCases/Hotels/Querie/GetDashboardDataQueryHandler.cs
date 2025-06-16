using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Application.UseCases.Hotels.DTOs;
using EasyStays.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStays.Application.UseCases.Hotels.Querie
{
    public class GetDashboardDataQueryHandler : IRequestHandler<GetDashboardDataQuery, DashboardDataDto>
    {
        private readonly IApplicationDbContext _context;

        public GetDashboardDataQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardDataDto> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
        {
            var hostHotelIds = await _context.Hotels
                .Where(h => h.OwnerId == request.UserId)
                .Select(h => h.Id)
                .ToListAsync(cancellationToken);

            var reservations = await _context.Reservations
                .Where(r => hostHotelIds.Contains(r.HotelId))
                .Include(r => r.Hotel)
                .ToListAsync(cancellationToken);

            var now = DateTime.UtcNow;

            var lastMonthStart = now.AddMonths(-1);
            var lastMonthEnd = now;

            var previousMonthStart = now.AddMonths(-2);
            var previousMonthEnd = lastMonthStart;

            int currentBookings = reservations.Count(r => r.CreatedAt >= lastMonthStart && r.CreatedAt <= lastMonthEnd);
            int previousBookings = reservations.Count(r => r.CreatedAt >= previousMonthStart && r.CreatedAt < lastMonthStart);
            string bookingsChange = CalculatePercentageChange(previousBookings, currentBookings);

            decimal currentRevenue = reservations
                .Where(r => r.Status == ReservationStatus.Confirmed && r.CreatedAt >= lastMonthStart && r.CreatedAt <= lastMonthEnd)
                .Sum(r => r.TotalPrice);

            decimal previousRevenue = reservations
                .Where(r => r.Status == ReservationStatus.Confirmed && r.CreatedAt >= previousMonthStart && r.CreatedAt < lastMonthStart)
                .Sum(r => r.TotalPrice);

            string revenueChange = CalculatePercentageChange(previousRevenue, currentRevenue);

            int reservedRooms = await _context.RoomUnitReservations
                .CountAsync(rur => hostHotelIds.Contains(rur.RoomUnit.Room.HotelId), cancellationToken);

            var totalRoomCapacity = await _context.Rooms
                .Where(r => hostHotelIds.Contains(r.HotelId))
                .SumAsync(r => r.RoomCount, cancellationToken);

            var currentlyReserved = await _context.RoomUnitReservations
                .Where(rur => hostHotelIds.Contains(rur.RoomUnit.Room.HotelId))
                .CountAsync(cancellationToken);

            int totalAvailableRooms = totalRoomCapacity - currentlyReserved;

            int currentReservedRooms = await _context.RoomUnitReservations
                .Where(rur => hostHotelIds.Contains(rur.RoomUnit.Room.HotelId) &&
                       rur.StartDate >= lastMonthStart && rur.StartDate <= lastMonthEnd)
                .CountAsync(cancellationToken);

            int previousReservedRooms = await _context.RoomUnitReservations
                .Where(rur => hostHotelIds.Contains(rur.RoomUnit.Room.HotelId) &&
                       rur.StartDate >= previousMonthStart && rur.StartDate < lastMonthStart)
                .CountAsync(cancellationToken);

            string reservedChange = CalculatePercentageChange(previousReservedRooms, currentReservedRooms);

            var recentBookings = reservations
                .OrderByDescending(r => r.CreatedAt)
                .Take(3)
                .Select(r => new RecentBookingDto
                {
                    Name = $"{r.FirstName} {r.LastName}",
                    Status = r.Status.ToString(),
                    Venue = r.Hotel.Name,
                    Date = r.CheckInDate.ToString("dd MMM yyyy"),
                    Time = $"{r.CheckInDate:HH:mm} - {r.CheckOutDate:HH:mm}"
                })
                .ToList();

            var startOfYear = new DateTime(DateTime.UtcNow.Year, 1, 1);
            var filteredReservations = reservations
                .Where(r => r.CreatedAt >= startOfYear && r.CreatedAt <= now)
                .ToList();

            var monthlyStats = Enumerable.Range(1, 8).Select(month =>
            {
                var count = filteredReservations.Count(r => r.CreatedAt.Month == month);
                var monthName = new DateTime(1, month, 1).ToString("MMM");

                return new MonthlyStatDto
                {
                    Name = monthName,
                    Visitors = count
                };
            }).ToList();

            return new DashboardDataDto
            {
                Stats = new StatsDto
                {
                    NewBookings = currentBookings,
                    TotalRevenue = $"${currentRevenue:N0}",
                    TotalReserved = $"{reservedRooms} / {totalAvailableRooms}",
                    Changes = new ChangeDto
                    {
                        Bookings = bookingsChange,
                        Revenue = revenueChange,
                        Reserved = reservedChange
                    }
                },
                MonthlyStats = monthlyStats,
                RecentBookings = recentBookings
            };
        }

        private string CalculatePercentageChange(decimal oldValue, decimal newValue)
        {
            if (oldValue == 0 && newValue > 0)
                return "+100%";
            if (oldValue == 0 && newValue == 0)
                return "0%";

            var change = ((newValue - oldValue) / Math.Abs(oldValue)) * 100;
            var sign = change >= 0 ? "+" : "-";
            return $"{sign}{Math.Abs(change):0}%";
        }
    }
}
