using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Googster.Migrations
{
    public partial class larvae_add_date1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date1",
                table: "Larvae",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date1",
                table: "Larvae");
        }
    }
}
