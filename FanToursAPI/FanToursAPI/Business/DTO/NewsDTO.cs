using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class NewsDTO : BaseDTO
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public NewsPictureDTO Picture { get; set; }
    }
}
