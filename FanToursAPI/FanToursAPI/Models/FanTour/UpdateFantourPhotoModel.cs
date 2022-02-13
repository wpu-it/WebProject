using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.FanTour
{
    public class UpdateFantourPhotoModel
    {
        [Required(ErrorMessage = "Photo is required")]
        public string NewPhoto { get; set; }
        [Required(ErrorMessage = "Fan tour is required")]
        public int FanTourId { get; set; }
    }
}
