using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class FanTourPictureDTO : BaseDTO
    {
        public byte[] Content { get; set; }
        public string Name { get; set; }
        public int FanTourId { get; set; }
        public FanTourDTO FanTourDTO { get; set; }
    }
}
