using System.Text;
using System.Text.Json;

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

public async Task<List<BudgetCategory>> GetStructuredBudget(string prompt)
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
            new {
                name = "generate_budget",
                description = "Generate a budget with exact category amounts",
                parameters = new {
                    type = "object",
                    properties = new {
                        categories = new {
                            type = "array",
                            items = new {
                                type = "object",
                                properties = new {
                                    name = new { type = "string" },
                                    amount = new { type = "number" }
                                },
                                required = new[] { "name", "amount" }
                            }
                        }
                    },
                    required = new[] { "categories" }
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

    var parsedResponse = JsonSerializer.Deserialize<OpenAiResponse>(responseJson);

    // Handle OpenAI errors
    if (parsedResponse?.Error != null)
    {
        throw new Exception($"OpenAI API Error: {parsedResponse.Error.Message}");
    }

    var functionCallArgumentsJson = parsedResponse?.Choices?.FirstOrDefault()?.Message?.FunctionCall?.Arguments;

    if (string.IsNullOrEmpty(functionCallArgumentsJson))
    {
        Console.WriteLine("No function call arguments returned from OpenAI.");
        return new List<BudgetCategory>();
    }
    var arguments = JsonSerializer.Deserialize<FunctionArguments>(functionCallArgumentsJson);

    return arguments?.Categories ?? new List<BudgetCategory>();
}
}

// Supporting classes for structured response
public class BudgetCategory
{
    public required string Name { get; set; }
    public decimal Amount { get; set; }
}

public class OpenAiResponse
{
    public List<Choice>? Choices { get; set; } // Nullable to prevent deserialization errors
    public OpenAiError? Error { get; set; }    // Add this to capture errors
}

public class OpenAiError
{
    public string Message { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}

public class Choice
{
    public required Message Message { get; set; }
}

public class Message
{
    public required FunctionCall FunctionCall { get; set; }
}

public class FunctionCall
{
    public required string Arguments { get; set; }
}

public class Arguments
{
    public required List<BudgetCategory> Categories { get; set; }
}
public class FunctionArguments
{
    public required List<BudgetCategory> Categories { get; set; }
}