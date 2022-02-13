using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.User
{
    public class UpdateUserPhotoModel
    {
        [Required(ErrorMessage = "Photo is required")]
        public string NewPhoto { get; set; }

        [Required(ErrorMessage = "User is required")]
        public int UserId { get; set; }
    }
}
