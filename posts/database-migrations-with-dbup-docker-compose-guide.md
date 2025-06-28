---
slug: 'database-migrations-with-dbup-docker-compose-guide'
title: 'Automate Database Migrations with DbUp and Docker Compose: A .NET Developer’s Guide'
excerpt: 'Learn how to integrate DbUp with Docker Compose for seamless database migrations in your .NET projects. Automate your migrations and streamline your workflow.'
tags: ['.NET', 'DbUp', 'Docker', 'docker-compose', 'database-migrations', 'DevOps', 'Dapper', 'programming']
readTime: 7 min
date: '2025-01-24'
image: database-migrations-with-dbup-docker-compose-guide.webp
---

I know that we all love working with Entity Framework Core.
I bet that when you're starting a project you are applying the migrations during the startup. This is fast during the development work, but as Microsoft says: [this approach is inappropriate for managing production databases](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying?tabs=dotnet-core-cli#apply-migrations-at-runtime)

To apply migrations during the startup will need to call MigrateAsync on the context `dbContext.Database.MigrateAsync()` . This is typical code that does that:

```csharp
builder.Services.AddDbContext<EventsDbContext>((sp, options) =>
{
    options.UseNpgsql(conn);
});

var app = builder.Build();

var serviceScopeFactory = app.Services.GetService<IServiceScopeFactory>()!;
using (var scope = serviceScopeFactory.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<EventsDbContext>()!;
    await dbContext.Database.MigrateAsync();
}
```

## Db UP to manage the migrations
>
>DbUp is a .NET library that helps you to deploy changes to SQL Server databases. It tracks which SQL scripts have been run already, and runs the change scripts that are needed to get your database up to date.

[Take a look at their documentation](https://dbup.readthedocs.io/en/latest/)

Important: DbUp is `always go forward` migrations. So, if the needs comes to rollback, you will still need to go forward with another script.

To use DbUp is best to have a separate console application that will perform the database upgrade and have the following code:

```csharp
// See https://aka.ms/new-console-template for more information
using DbUp;

Console.WriteLine("Migration Starting");
var connectionString = Environment.GetEnvironmentVariable("ConnectionString") ?? "Host=localhost;Database=Curriculum;Username=root;Password=password";

Upgrade(connectionString);

Console.WriteLine("Migration Done");

void Upgrade(string connectionString)
{
    EnsureDatabase.For.PostgresqlDatabase(connectionString);

    var upgrader = DeployChanges.To.PostgresqlDatabase(connectionString)
        .WithScriptsEmbeddedInAssembly(typeof(Program).Assembly)
        .LogToConsole()
        .Build()
        ;

    if (upgrader.IsUpgradeRequired())
    {
        upgrader.PerformUpgrade();
    }
}

```

## Db Up and Docker compose migrations

Steps:

- Database is running
- Apply the migrations
- Start the app.

### docker-compose.yml

```yaml
services:
  api:
    container_name: curriculum-api
    image: curriculum-api
    build:
      context: src/
      dockerfile: Curriculum.API/Dockerfile
    environment:
      - ASPNETCORE_HTTP_PORTS=5000
      - Cors=http://localhost:3000
      - ConnectionStrings__Resume=Host=host.docker.internal;Database=Curriculum;Username=root;Password=password
    ports:
      - "5000:5000"
    depends_on:
      postgres:
        condition: service_healthy
      db-migrator:
        condition: service_completed_successfully
    networks:
      - curriculum_network

  postgres:
    image: postgres:16.3
    container_name: postgres
    ports:
      - 5432:5432
    volumes:
      - postgresdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=root
      - POSTGRES_DB=Curriculum
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U root -d Curriculum"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - curriculum_network

  db-migrator:
    container_name:  db-migrator
    image:  db-migrator
    restart: "no" # Ensures the container doesn't restart
    build:
      context: src/
      dockerfile: Curriculum.Migrator/Dockerfile
    environment:
      - ConnectionString=Host=host.docker.internal;Database=Curriculum;Username=root;Password=password
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - curriculum_network

volumes:
  postgresdata:
  
networks:
  curriculum_network:    
    driver: bridge

```

The most important things in this docker-compose.yaml:

**The service that needs the database must depend on the database being healthy and the migrator completed succesfully.**

```yaml
api:
    depends_on:
      postgres:
        condition: service_healthy
      db-migrator:
        condition: service_completed_successfully
```

Also the database migrator service should wait the database to be healthy:

```yaml
  db-migrator:
    depends_on:
      postgres:
        condition: service_healthy
```
