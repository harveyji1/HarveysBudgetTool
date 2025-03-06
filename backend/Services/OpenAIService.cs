using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;

public class OpenAIService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public OpenAIService(IConfiguration configuration)
    {
        _httpClient = new HttpClient();
        _apiKey = configuration["OpenAI:ApiKey"] ?? throw new ArgumentNullException(nameof(configuration), "OpenAI API key is missing.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);
    }

    public async Task<string> GetSuggestedBudget(string prompt)
    {
        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "user", content = prompt }
            },
            max_tokens = 500
        };

        var requestJson = JsonSerializer.Serialize(requestBody);
        var requestContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

        using var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseJson);

        return doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? string.Empty;
    }

public async Task<List<Category>> GetStructuredBudget(string prompt)
{
    var requestBody = new
    {
        model = "gpt-3.5-turbo",
        messages = new[]
        {
            new { role = "system", content = "You are a budgeting assistant that returns structured budget recommendations." },
            new { role = "user", content = prompt }
        },
        functions = new[]
            {
                new
                {
                    name = "generate_budget",
                    description = "Generate a budget with exact category amounts",
                    parameters = new
                    {
                        type = "object",
                        properties = new
                        {
                            categories = new
                            {
                                type = "array",
                                items = new
                                {
                                    type = "object",
                                    properties = new
                                    {
                                        name = new { type = "string" },
                                        amount = new { type = "number" }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            function_call = "auto"
        };

    var requestJson = JsonSerializer.Serialize(requestBody);
    var requestContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

    using var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);
    
    // Log raw response
    var responseJson = await response.Content.ReadAsStringAsync();
    Console.WriteLine("OpenAI Response: " + responseJson); // Debugging output

    response.EnsureSuccessStatusCode();
    using var doc = JsonDocument.Parse(responseJson);

    var choices = doc.RootElement.GetProperty("choices");
    var firstChoice = choices[0].GetProperty("message");
    var functionCall = firstChoice.GetProperty("function_call");

    var argumentsJson = functionCall.GetProperty("arguments").GetString() ?? string.Empty;
    // Console.WriteLine("The arguments: " + argumentsJson);
    var jsonDoc = JsonDocument.Parse(argumentsJson);
    if (jsonDoc.RootElement.TryGetProperty("categories", out var categoriesElement))
    {
        var categories = JsonSerializer.Deserialize<List<Category>>(categoriesElement.GetRawText());
        // Console.WriteLine("Extracted Categories: " + JsonSerializer.Serialize(categories));
        return categories ?? new List<Category>();
    }
    else{
        return new List<Category>();
    }

}
}

// Supporting classes for structured response
public class Category
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("amount")]
    public decimal Amount { get; set; }
}

public class BudgetResponse
{
    public List<Category> Categories { get; set; } = new();
}