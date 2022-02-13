using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.FanTour
{
    public class CreateFanTourModel
    {
        [Required(ErrorMessage = "Title is required")]
        [RegularExpression("(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*", ErrorMessage = "Title must start with word and contain words")]
        [MaxLength(100, ErrorMessage = "Title max length - 100 symbols")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [RegularExpression("(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*", ErrorMessage = "Description must start with word and contain words")]
        [MaxLength(500, ErrorMessage = "Description max length - 500 symbols")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Schedule is required")]
        [RegularExpression("(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*", ErrorMessage = "Schedule must start with word and contain words")]
        [MaxLength(500, ErrorMessage = "Schedule max length - 500 symbols")]
        public string Schedule { get; set; }

        [Required(ErrorMessage = "Ticket price is required")]
        [Range(1, double.MaxValue, ErrorMessage = "Ticket price min value = 1")]
        public decimal TicketPrice { get; set; }

        [Required(ErrorMessage = "Price without ticket is required")]
        [Range(1, double.MaxValue, ErrorMessage = "Price without ticket min value = 1")]
        public decimal PriceWithoutTicket { get; set; }

        [Required(ErrorMessage = "Photo is required")]
        public string Photo { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Min value of quantity = 1")]
        public int Quantity { get; set; }
    }
}
