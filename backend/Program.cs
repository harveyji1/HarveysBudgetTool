var builder = WebApplication.CreateBuilder(args);

// Register the OpenAIService
builder.Services.AddScoped<OpenAIService>();

// CORS Policy: Allow both local and production origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:5173", "https://harveyji1.github.io")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();

var app = builder.Build();

// Use CORS
app.UseCors("AllowReactApp");

// Middleware
app.UseAuthorization();
app.MapControllers();
app.Run();
