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
    public class UsersService : IService<UserDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public UsersService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(UserDTO entity)
        {
            await uow.UsersRepository.Create(mapper.Mapper.Map<User>(entity));
        }

        public async Task<UserDTO> Get(int id)
        {
            return mapper.Mapper.Map<UserDTO>(await uow.UsersRepository.Get(id));
        }

        public async Task<List<UserDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<UserDTO>>(await uow.UsersRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.UsersRepository.Remove(id);
        }

        public async Task Update(UserDTO entity)
        {
            await uow.UsersRepository.Update(mapper.Mapper.Map<User>(entity));
        }
    }
}
