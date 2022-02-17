using FanToursAPI.Business.Automapper;
using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Interfaces;
using FanToursAPI.DB.Entities;
using FanToursAPI.DB.Interfaces;
using FanToursAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.Services
{
    public class UsersService : IService<UserDTO>
    {
        IUnitOfWork uow;
        JwtService jwtService;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public UsersService(IUnitOfWork uow, JwtService jwtService)
        {
            this.uow = uow;
            this.jwtService = jwtService;
        }

        public async Task Create(UserDTO entity)
        {
            entity.IsAdmin = false;
            entity.Discount = 0;
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

        public async Task<UserDTO> GetUserByAccessToken(string accessToken)
        {
            var users = await GetAll();
            var email = jwtService.EncodeAccessToken(accessToken);
            if (users is null) return null;
            foreach (var user in users)
            {
                if(email == user.Email)
                {
                    return user;
                }
            }
            return null;
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            var users = await GetAll();
            foreach (var user in users)
            {
                if (user.Email == email) return user;
            }
            return null;
        }

        public async Task<bool> IsEmailExists(string email, int userId)
        {
            var users = await GetAll();
            foreach (var user in users)
            {
                if (email == user.Email && userId != user.Id)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
