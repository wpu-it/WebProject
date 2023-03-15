using AutoMapper;
using FanToursAPI.Business.Services;
using FanToursAPI.DB.Entities;
using FanToursAPI.Models;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.FanTour;
using FanToursAPI.Models.Order;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [Route("api/charts")]
    [ApiController]
    public class ChartsController : Controller
    {
        ObjectMapperModels mapper = ObjectMapperModels.Instance;
        OrdersService ordersService;
        public ChartsController(OrdersService ordersService)
        {
            this.ordersService = ordersService;
        }

        [HttpGet]
        [Route("get-orders-diagram")]
        public async Task<ActionResult> GetOrdersDiagram()
        {
            var orders = await ordersService.GetAll();
            List<OrdersDiagramModel> result = new List<OrdersDiagramModel>();
            if(orders is not null)
            {
                foreach (var order in orders)
                {
                    if(result.Exists((ord) => ord.FanTourName == order.FanTour.Title))
                    {
                        result.Find((ord) => ord.FanTourName == order.FanTour.Title).Count++;
                    }
                    else
                    {
                        result.Add(new OrdersDiagramModel { FanTourName = order.FanTour.Title, Count = 1 });
                    }
                }
            }
            return new JsonResult(result);
        }
    }
}
