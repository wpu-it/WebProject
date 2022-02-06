using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class UserPictureDTO : BaseDTO
    {
        public byte[] Content { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
    }
}
