using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.User
{
    public class UpdateUserPhotoModel
    {
        public string NewPhoto { get; set; }
        public int UserId { get; set; }
    }
}
