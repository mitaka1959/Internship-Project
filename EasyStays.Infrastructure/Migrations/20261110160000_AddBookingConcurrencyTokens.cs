using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyStays.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingConcurrencyTokens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Version",
                table: "Rooms",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            // SQL Server fills rowversion in automatically for existing and new
            // rows, so this column needs no default value.
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Reservations",
                type: "rowversion",
                rowVersion: true,
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Reservations");
        }
    }
}
