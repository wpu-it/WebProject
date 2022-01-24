using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class OrderDTO : BaseDTO
    {
        public string ConsFullname { get; set; }
        public string ConsEmail { get; set; }
        public string ConsPhoneNumber { get; set; }
        public int FanTourId { get; set; }
        public FanTourDTO FanTour { get; set; }
    }
}
