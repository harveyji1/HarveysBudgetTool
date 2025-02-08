using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class OpenAIService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public OpenAIService(IConfiguration configuration)
    {
        _httpClient = new HttpClient();
        _apiKey = configuration["OpenAI:ApiKey"];
    }

    public async Task<string> GetAIResponse(string prompt)
{
    var requestBody = new
    {
        model = "gpt-3.5-turbo",
        messages = new[] {
            new {
                role = "user",
                content = prompt
            }
        },
        max_tokens = 100
    };

    var requestJson = JsonSerializer.Serialize(requestBody);
    var requestContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

    // Create a new HttpRequestMessage to ensure headers don't persist
    using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
    {
        Content = requestContent
    };
    
    // Set the Authorization header for this request only
    request.Headers.Add("Authorization", $"Bearer {_apiKey}");

    using var response = await _httpClient.SendAsync(request);

    response.EnsureSuccessStatusCode();
    var responseJson = await response.Content.ReadAsStringAsync();
    
    using var doc = JsonDocument.Parse(responseJson);
    return doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
}
}