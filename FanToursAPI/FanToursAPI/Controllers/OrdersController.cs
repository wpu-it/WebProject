using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.Order;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        ObjectMapperModels mapper = ObjectMapperModels.Instance;
        OrdersService ordersService;
        public OrdersController(OrdersService ordersService)
        {
            this.ordersService = ordersService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllOrders()
        {
            var orders = await ordersService.GetAll();
            if (orders is null) return BadRequest();
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderModel model)
        {
            var order = mapper.Mapper.Map<OrderDTO>(model);
            await ordersService.Create(order);
            var orders = await ordersService.GetAll();
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateOrder([FromBody] UpdateOrderModel model)
        {
            var order = await ordersService.Get(model.Id);
            if (order is null) return BadRequest();
            order.ConsFullname = model.ConsFullname;
            order.ConsEmail = model.ConsEmail;
            order.ConsPhoneNumber = model.ConsPhoneNumber;
            await ordersService.Update(order);
            var orders = await ordersService.GetAll();
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveOrder(int id)
        {
            if (await ordersService.Get(id) is null) return BadRequest();
            await ordersService.Remove(id);
            var orders = await ordersService.GetAll();
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }
    }
}
