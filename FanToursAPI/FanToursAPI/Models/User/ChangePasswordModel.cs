using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.User
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessage = "Old password is required")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "New password is required")]
        [MinLength(8, ErrorMessage = "New password min length - 8 symbols")]
        [MaxLength(50, ErrorMessage = "New password max length - 50 symbols")]
        [RegularExpression("(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}", 
            ErrorMessage = "New password must contain at least: 1 upper case letter, 1 lower case letter, 1 digit and 1 special symbol(| is not allowed)")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "User is required")]
        public int UserId { get; set; }
    }
}
