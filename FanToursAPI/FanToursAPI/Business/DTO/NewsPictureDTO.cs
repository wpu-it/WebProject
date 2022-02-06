using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class NewsPictureDTO : BaseDTO
    {
        public byte[] Content { get; set; }
        public string Name { get; set; }
        public int NewsId { get; set; }
        public NewsDTO News { get; set; }
    }
}
