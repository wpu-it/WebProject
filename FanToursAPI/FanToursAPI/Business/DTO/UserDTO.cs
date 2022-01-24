using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class UserDTO : BaseDTO 
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal Discount { get; set; }
        public bool IsAdmin { get; set; }
        public List<OrderDTO> Orders { get; set; }
    }
}
