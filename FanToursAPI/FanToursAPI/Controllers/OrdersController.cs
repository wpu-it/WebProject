using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Exceptions;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.Order;
using FanToursAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        SQLProtectService sQLProtectService;
        public OrdersController(OrdersService ordersService, SQLProtectService sQLProtectService)
        {
            this.ordersService = ordersService;
            this.sQLProtectService = sQLProtectService;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<ActionResult> GetAllOrders()
        {
            var orders = await ordersService.GetAll();
            if (orders is null) return BadRequest("Orders not found");
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult> GetOrderById(int id)
        {
            var order = await ordersService.Get(id);
            if (order is null) return BadRequest("Order not found");
            var mappedOrder = mapper.Mapper.Map<OrderModel>(order);
            return new JsonResult(mappedOrder);
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.ConsFullname)) return BadRequest("Invalid consumer full name");
            if (!sQLProtectService.isValid(model.ConsEmail)) return BadRequest("Invalid consumer email");
            if (!sQLProtectService.isValid(model.ConsPhoneNumber)) return BadRequest("Invalid consumer phone number");
            var order = mapper.Mapper.Map<OrderDTO>(model);
            await ordersService.Create(order);
            var orders = await ordersService.GetAll();
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateOrder([FromBody] UpdateOrderModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.ConsFullname)) return BadRequest("Invalid consumer full name");
            if (!sQLProtectService.isValid(model.ConsEmail)) return BadRequest("Invalid consumer email");
            if (!sQLProtectService.isValid(model.ConsPhoneNumber)) return BadRequest("Invalid consumer phone number");
            var order = await ordersService.Get(model.Id);
            if (order is null) return BadRequest("Order not found");
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
            if (await ordersService.Get(id) is null) return BadRequest("Order not found");
            await ordersService.Remove(id);
            var orders = await ordersService.GetAll();
            var mappedOrders = mapper.Mapper.Map<List<OrderModel>>(orders);
            return new JsonResult(mappedOrders);
        }

    }
}
