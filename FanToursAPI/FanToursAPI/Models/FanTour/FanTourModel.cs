using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.FanTour
{
    public class FanTourModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Schedule { get; set; }
        public decimal TicketPrice { get; set; }
        public decimal PriceWithoutTicket { get; set; }
        public string PhotoUrl { get; set; }
        public int Quantity { get; set; }
    }
}
