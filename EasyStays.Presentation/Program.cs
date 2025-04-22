using EasyStays.Application.Interfaces.Repositories;
using EasyStays.Infrastructure.Persistence;
using EasyStays.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using MediatR;
using EasyStays.Application.UseCases.Hotels;
using EasyStays.Application.Mappings;
using EasyStays.Presentation.Middleware;
using EasyStays.Application.Behaviors;
using Serilog;




var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(CreateHotelCommandHandler).Assembly));
builder.Services.AddAutoMapper(typeof(HotelProfile).Assembly);


builder.Services.AddControllers();
builder.Services.AddLogging();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped(
    typeof(IPipelineBehavior<,>),
    typeof(LoggingPipelineBehavior<,>)
);
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));


var app = builder.Build();
Console.WriteLine(" Built the app");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseSerilogRequestLogging();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthorization();
app.MapControllers();
Console.WriteLine(" Reached app.Run()");

app.Run();
