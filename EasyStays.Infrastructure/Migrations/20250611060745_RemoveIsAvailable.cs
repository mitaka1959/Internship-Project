using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyStays.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIsAvailable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "RoomUnit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "RoomUnit",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
