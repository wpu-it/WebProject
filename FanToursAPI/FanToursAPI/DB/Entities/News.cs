﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Entities
{
    public class News : BaseEntity
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public NewsPicture Picture { get; set; }
    }
}
