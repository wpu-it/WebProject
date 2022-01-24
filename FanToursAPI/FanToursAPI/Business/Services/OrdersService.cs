using FanToursAPI.Business.Automapper;
using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Interfaces;
using FanToursAPI.DB.Entities;
using FanToursAPI.DB.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.Services
{
    public class OrdersService : IService<OrderDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public OrdersService(IUnitOfWork uow)
        {
            this.uow = uow;
        }
        public async Task Create(OrderDTO entity)
        {
            await uow.OrdersRepository.Create(mapper.Mapper.Map<Order>(entity));
        }

        public async Task<OrderDTO> Get(int id)
        {
            return mapper.Mapper.Map<OrderDTO>(await uow.OrdersRepository.Get(id));
        }

        public async Task<List<OrderDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<OrderDTO>>(await uow.OrdersRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.OrdersRepository.Remove(id);
        }

        public async Task Update(OrderDTO entity)
        {
            await uow.OrdersRepository.Update(mapper.Mapper.Map<Order>(entity));
        }
    }
}
