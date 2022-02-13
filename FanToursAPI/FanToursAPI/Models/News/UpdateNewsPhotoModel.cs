using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.News
{
    public class UpdateNewsPhotoModel
    {
        [Required(ErrorMessage = "Photo is required")]
        public string NewPhoto { get; set; }

        [Required(ErrorMessage = "News id is required")]
        public int NewsId { get; set; }
    }
}
