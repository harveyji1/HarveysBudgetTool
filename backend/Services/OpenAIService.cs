using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

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

public async Task<string> GetStructuredBudget(string prompt)
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

    // Check if function_call exists
    if (firstChoice.TryGetProperty("function_call", out var functionCall))
    {
        var argumentsJson = functionCall.GetProperty("arguments").GetString() ?? string.Empty;
        return argumentsJson; // Return the structured JSON as a string
    }

    // Otherwise, fallback to regular content response
    return firstChoice.GetProperty("content").GetString() ?? string.Empty;

//     var parsedResponse = JsonSerializer.Deserialize<OpenAiResponse>(responseJson);

//     Console.WriteLine("Parsed Response: " + JsonSerializer.Serialize(parsedResponse, new JsonSerializerOptions { WriteIndented = true }));

// if (parsedResponse?.Choices?[0]?.Message?.FunctionCall?.ArgumentsJson != null)
// {
//     var arguments = JsonSerializer.Deserialize<Arguments>(parsedResponse.Choices[0].Message.FunctionCall.ArgumentsJson);
    
//     if (arguments?.Categories != null)
//     {
//         return arguments.Categories;
//     }
// }

// Console.WriteLine("No function call arguments returned from OpenAI.");
// return new List<BudgetCategory>();
// Log the raw function call arguments
// Console.WriteLine($"Raw Function Call Arguments: {functionCallArgumentsJson}");

// // Deserialize the function call arguments
// try
// {
//     var arguments = JsonSerializer.Deserialize<FunctionArguments>(functionCallArgumentsJson);
//     return arguments?.Categories ?? new List<BudgetCategory>();
// }
// catch (Exception ex)
// {
//     Console.WriteLine($"Error deserializing function call arguments: {ex.Message}");
//     return new List<BudgetCategory>();
// }
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
}

public class Choice
{
    public Message? Message { get; set; }
}

public class Message
{
    [JsonPropertyName("function_call")]
    public FunctionCall? FunctionCall { get; set; }
}

public class FunctionCall
{
    public string? Name { get; set; }

    [JsonPropertyName("arguments")]
    public string? ArgumentsJson { get; set; }
}

public class Arguments
{
    public required List<BudgetCategory> Categories { get; set; }
}
public class FunctionArguments
{
    [JsonPropertyName("categories")]
    public List<BudgetCategory> Categories { get; set; } = new();
}