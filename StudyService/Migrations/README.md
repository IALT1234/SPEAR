# EF Core Migrations

This directory contains Entity Framework Core migrations for the StudyService database.

## Creating Migrations

To create a new migration after making changes to the `StudyAnswerRecord` model or `StudyDbContext`:

```bash
dotnet ef migrations add MigrationName --project StudyService
```

## Applying Migrations

Migrations are automatically applied when the application starts (see `Program.cs`).

To manually apply migrations:

```bash
dotnet ef database update --project StudyService
```

## Reverting Migrations

To revert the last migration:

```bash
dotnet ef database update PreviousMigrationName --project StudyService
```

## Tools

Make sure you have the EF Core tools installed:

```bash
dotnet tool install --global dotnet-ef
```
