using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.Order
{
    public class UpdateOrderModel
    {
        public int Id { get; set; }
        public string ConsFullname { get; set; }
        public string ConsEmail { get; set; }
        public string ConsPhoneNumber { get; set; }
    }
}
