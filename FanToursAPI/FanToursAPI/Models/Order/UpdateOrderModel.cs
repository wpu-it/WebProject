﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.Order
{
    public class UpdateOrderModel
    {
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Consumer fullname is required")]
        [RegularExpression("^[A-Z,a-z, ]+$", ErrorMessage = "Consumer fullname must be written only with latin letters and spaces")]
        [MaxLength(50, ErrorMessage = "Consumer fullname max length - 50 symbols")]
        public string ConsFullname { get; set; }

        [Required(ErrorMessage = "Consumer phone number is required")]
        [RegularExpression("^\\(\\+380\\)\\d{9}$", ErrorMessage = "Number format: \"(+380)_________\"")]
        public string ConsPhoneNumber { get; set; }
    }
}
