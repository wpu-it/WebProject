using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.FanTour
{
    public class UpdateFantourPhotoModel
    {
        public string NewPhoto { get; set; }
        public int FanTourId { get; set; }
    }
}
