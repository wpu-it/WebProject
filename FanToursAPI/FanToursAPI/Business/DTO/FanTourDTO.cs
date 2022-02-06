using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.DTO
{
    public class FanTourDTO : BaseDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Schedule { get; set; }
        public decimal PriceWithoutTicket { get; set; }
        public decimal TicketPrice { get; set; }
        public int Quantity { get; set; }
        public List<OrderDTO> Orders { get; set; }
        public FanTourPictureDTO Picture { get; set; }
    }
}
