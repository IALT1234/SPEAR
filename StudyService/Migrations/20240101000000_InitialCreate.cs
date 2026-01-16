using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudyAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    DeckId = table.Column<int>(type: "INTEGER", nullable: false),
                    CardId = table.Column<int>(type: "INTEGER", nullable: false),
                    IsCorrect = table.Column<bool>(type: "INTEGER", nullable: false),
                    AnsweredAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyAnswers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudyAnswers_AnsweredAtUtc",
                table: "StudyAnswers",
                column: "AnsweredAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_StudyAnswers_UserId",
                table: "StudyAnswers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyAnswers_UserId_DeckId",
                table: "StudyAnswers",
                columns: new[] { "UserId", "DeckId" });

            migrationBuilder.CreateIndex(
                name: "IX_StudyAnswers_AnsweredAtUtc_UserId",
                table: "StudyAnswers",
                columns: new[] { "AnsweredAtUtc", "UserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudyAnswers");
        }
    }
}
