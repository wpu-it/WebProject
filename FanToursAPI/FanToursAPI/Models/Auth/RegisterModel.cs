using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.Auth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Fullname is required")]
        [RegularExpression("^[A-Z,a-z, ]+$", ErrorMessage = "Fullname must be written only with latin letters and spaces")]
        [MaxLength(50, ErrorMessage = "Fullname max length - 50 symbols")]
        public string Fullname { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [RegularExpression("^[\\w.]+[@][A-Za-z]+[.]+[A-Za-z.]+$", ErrorMessage = "Invalid email")]
        [MaxLength(50, ErrorMessage = "Email max length - 50 symbols")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password min length - 8 symbols")]
        [RegularExpression("(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}", ErrorMessage = "Password must contain at least: 1 upper case letter, 1 lower case letter, 1 digit and 1 special symbol(| is not allowed)")]
        [MaxLength(50, ErrorMessage = "Password max length - 50 symbols")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Photo is requred")]
        public string Photo { get; set; }
    }
}
