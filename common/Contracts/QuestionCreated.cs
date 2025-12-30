namespace Contracts;

public record class QuestionCreated(string QuestionId, string Title, string Content, DateTime Created, List<string> Tags);
