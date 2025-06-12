using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyStays.Application.Interfaces.Email;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Net.Http;
using EasyStays.Application.UseCases.Reservations.DTOs;
using System.ComponentModel;
using QuestPDF.Previewer;

namespace EasyStays.Infrastructure.Email
{
    public class BookingConfirmationPdfGenerator : IBookingConfirmationPdfGenerator
    {
        private readonly HttpClient _httpClient;

        public BookingConfirmationPdfGenerator()
        {
            _httpClient = new HttpClient();
        }

        public byte[] Generate(BookingConfirmationDto dto)
        {
            byte[]? hotelImageBytes = null;
            try
            {
                if (!string.IsNullOrWhiteSpace(dto.HotelImageUrl))
                {
                    hotelImageBytes = _httpClient.GetByteArrayAsync(dto.HotelImageUrl).Result;
                }
            }
            catch
            {
                hotelImageBytes = null;
            }

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(50);

                    page.Header().Column(header =>
                    {
                        header.Spacing(10);

                        header.Item().Text("Booking Confirmation")
                            .FontSize(24)
                            .Bold()
                            .AlignCenter();

                        if (hotelImageBytes != null)
                        {
                            header.Item().Height(200).Image(hotelImageBytes).FitWidth();
                        }
                    });

                    page.Content().Column(col =>
                    {
                        col.Spacing(15);

                        col.Item().Text("Hotel Information").FontSize(18).Bold().Underline();
                        col.Item().Text($"Hotel: {dto.HotelName}");
                        col.Item().Text($"Address: {dto.HotelAddress}");
                        col.Item().Text($"Phone: {dto.HotelPhone}");

                        col.Item().Text("Guest Information").FontSize(18).Bold().Underline();
                        col.Item().Text($"Guest Name: {dto.FirstName} {dto.LastName}");

                        col.Item().Text("Reservation Details").FontSize(18).Bold().Underline();
                        col.Item().Text($"Reservation Number: {dto.ReservationNumber}");
                        col.Item().Text($"Check-in Date: {dto.CheckInDate:dd MMM yyyy}");
                        col.Item().Text($"Check-out Date: {dto.CheckOutDate:dd MMM yyyy}");
                        col.Item().Text($"Number of Nights: {dto.NumberOfNights}");

                        col.Item().Text("Room Information").FontSize(18).Bold().Underline();
                        col.Item().Text($"Room Type: {dto.RoomName}");
                        col.Item().Text($"Room Count: {dto.RoomCount}");

                        col.Item().Text("Price").FontSize(18).Bold().Underline();
                        col.Item().Text($"Total Price: {dto.TotalPrice:C}");

                        col.Item().Text("Hotel Policies").FontSize(18).Bold().Underline();
                        foreach (var policy in dto.HotelPolicies)
                        {
                            col.Item().Text($"• {policy}");
                        }

                        if (!string.IsNullOrWhiteSpace(dto.SpecialRequests))
                        {
                            col.Item().Text("Special Requests").FontSize(18).Bold().Underline();
                            col.Item().Text(dto.SpecialRequests);
                        }
                    });

                    page.Footer().AlignCenter().Text("Thank you for booking with EasyStays!").FontSize(14).Italic();
                });
            });

           

            return document.GeneratePdf();
        }
    }
}