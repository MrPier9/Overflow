using System.ComponentModel.DataAnnotations;

namespace QuestionService.DTOs;

public record class CreateAnswerDto([Required] string Content);
