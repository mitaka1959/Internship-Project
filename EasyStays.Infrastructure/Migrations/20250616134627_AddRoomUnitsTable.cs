using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyStays.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRoomUnitsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomUnit_Rooms_RoomId",
                table: "RoomUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomUnitReservations_RoomUnit_RoomUnitId",
                table: "RoomUnitReservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomUnit",
                table: "RoomUnit");

            migrationBuilder.RenameTable(
                name: "RoomUnit",
                newName: "RoomUnits");

            migrationBuilder.RenameIndex(
                name: "IX_RoomUnit_RoomId",
                table: "RoomUnits",
                newName: "IX_RoomUnits_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomUnits",
                table: "RoomUnits",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomUnitReservations_RoomUnits_RoomUnitId",
                table: "RoomUnitReservations",
                column: "RoomUnitId",
                principalTable: "RoomUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomUnits_Rooms_RoomId",
                table: "RoomUnits",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomUnitReservations_RoomUnits_RoomUnitId",
                table: "RoomUnitReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomUnits_Rooms_RoomId",
                table: "RoomUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomUnits",
                table: "RoomUnits");

            migrationBuilder.RenameTable(
                name: "RoomUnits",
                newName: "RoomUnit");

            migrationBuilder.RenameIndex(
                name: "IX_RoomUnits_RoomId",
                table: "RoomUnit",
                newName: "IX_RoomUnit_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomUnit",
                table: "RoomUnit",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomUnit_Rooms_RoomId",
                table: "RoomUnit",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomUnitReservations_RoomUnit_RoomUnitId",
                table: "RoomUnitReservations",
                column: "RoomUnitId",
                principalTable: "RoomUnit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
