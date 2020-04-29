using Microsoft.EntityFrameworkCore.Migrations;

namespace Googster.Migrations
{
    public partial class ularvae : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Result",
                table: "Larvae",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Result",
                table: "Larvae");
        }
    }
}
