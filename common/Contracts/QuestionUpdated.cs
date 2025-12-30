namespace Contracts;

public record class QuestionUpdated(string QuestionId, string Title, string Content, string[] Tags);
