using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.News
{
    public class UpdateNewsModel
    {
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [RegularExpression("(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*", ErrorMessage = "Title must start with word and contain words")]
        [MaxLength(100, ErrorMessage = "Title max length - 100 symbols")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Text is required")]
        [RegularExpression("(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*", ErrorMessage = "Text must start with word and contain words")]
        [MaxLength(500, ErrorMessage = "Text max length - 500 symbols")]
        public string Text { get; set; }
    }
}
