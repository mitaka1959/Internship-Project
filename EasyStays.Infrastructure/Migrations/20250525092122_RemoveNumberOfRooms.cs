using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyStays.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNumberOfRooms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfRooms",
                table: "Hotels");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfRooms",
                table: "Hotels",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
