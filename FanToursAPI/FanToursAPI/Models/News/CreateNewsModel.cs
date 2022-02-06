using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.News
{
    public class CreateNewsModel
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public byte[] Picture { get; set; }
    }
}
