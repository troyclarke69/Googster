using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Googster.Migrations
{
    public partial class larvae : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Larvae",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IntId = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Province = table.Column<string>(nullable: true),
                    Cases = table.Column<string>(nullable: true),
                    Deaths = table.Column<string>(nullable: true),
                    Recovered = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Larvae", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Larvae");
        }
         
    }
}
