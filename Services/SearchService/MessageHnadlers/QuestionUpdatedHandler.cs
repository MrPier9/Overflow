using System.Text.RegularExpressions;
using Contracts;
using Typesense;

namespace SearchService.MessageHnadlers;

public class QuestionUpdatedHandler(ITypesenseClient client)
{
    public async Task HandleAsync(QuestionUpdated message)
    {
        await client.UpdateDocument("questions", message.QuestionId, new
        {
            Id = message.QuestionId,
            Content = StripHtml(message.Content),
            Tags = message.Tags.ToArray()
        });
    }

    private static string StripHtml(string content)
    {
        return Regex.Replace(content, "<.*?>", string.Empty);
    }
}
