using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Entities
{
    public class NewsPicture : BaseEntity
    {
        public byte[] Content { get; set; }
        public string Name { get; set; }
        public int NewsId { get; set; }
        public News News { get; set; }
    }
}
