using System;
using System.Collections.Generic;

namespace EasyStays.Application.UseCases.Hotels.DTOs
{
    public class DashboardDataDto
    {
        public StatsDto Stats { get; set; }
        public List<MonthlyStatDto> MonthlyStats { get; set; }
        public List<RecentBookingDto> RecentBookings { get; set; }
    }

    public class StatsDto
    {
        public int NewBookings { get; set; }
        public string TotalRevenue { get; set; }
        public string TotalReserved { get; set; }
        public ChangeDto Changes { get; set; }
    }

    public class ChangeDto
    {
        public string Bookings { get; set; }
        public string Revenue { get; set; }
        public string Reserved { get; set; }
    }

    public class MonthlyStatDto
    {
        public string Name { get; set; }
        public int Visitors { get; set; }
    }

    public class RecentBookingDto
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public string Venue { get; set; }
        public string Date { get; set; }
        public string RoomType { get; set; }
    }
}
