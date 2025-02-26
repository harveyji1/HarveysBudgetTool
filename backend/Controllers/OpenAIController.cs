using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/openai")]
[ApiController]
public class OpenAIController : ControllerBase
{
    private readonly OpenAIService _openAIService;

    public OpenAIController(OpenAIService openAIService)
    {
        _openAIService = openAIService;
    }

    public class ChatRequest
    {
        public required string Prompt { get; set; }
    }

    [HttpPost("suggested-budget")]
    public async Task<IActionResult> GetSuggestedBudget([FromBody] ChatRequest request)
    {
        var response = await _openAIService.GetSuggestedBudget(request.Prompt);
        return Ok(new { response });
    }

    [HttpPost("structured-budget")]
    public async Task<IActionResult> GetStructuredBudget([FromBody] ChatRequest request)
    {
        var suggestedBudget = await _openAIService.GetStructuredBudget(request.Prompt);
        return Ok(new {suggestedBudget});
    }
}
