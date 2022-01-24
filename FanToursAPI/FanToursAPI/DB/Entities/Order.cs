using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Entities
{
    public class Order : BaseEntity
    {
        public string ConsFullname { get; set; }
        public string ConsEmail { get; set; }
        public string ConsPhoneNumber { get; set; }
        public int FanTourId { get; set; }
        public FanTour FanTour { get; set; }
    }
}
