using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyStays.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedTestUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DateOfBirth", "Email", "IsEmailVerified", "Name", "PasswordHash", "PhoneNumber", "ProfilePictureUrl", "Role" },
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6"), new DateTime(2025, 4, 17, 6, 44, 13, 970, DateTimeKind.Utc).AddTicks(1722), new DateTime(1990, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "test@example.com", true, "Test Owner", "hashedpassword123", "1234567890", null, "Owner" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6"));
        }
    }
}
