using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Entities
{
    public class FanTourPicture : BaseEntity
    {
        public byte[] Content { get; set; }
        public string Name { get; set; }
        public int FanTourId { get; set; }
        public FanTour FanTour { get; set; }
    }
}
