using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.JwtResponse
{
    public class JwtResponse
    {
        public string AccessToken { get; set; }
        public string Role { get; set; }
    }
}
