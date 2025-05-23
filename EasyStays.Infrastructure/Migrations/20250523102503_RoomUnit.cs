using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyStays.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RoomUnit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Hotels");

            migrationBuilder.CreateTable(
                name: "RoomUnit",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomUnit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomUnit_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomUnit_RoomId",
                table: "RoomUnit",
                column: "RoomId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomUnit");

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Hotels",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
