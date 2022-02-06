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
    public class UserPicturesService : IService<UserPictureDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public UserPicturesService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(UserPictureDTO entity)
        {
            await uow.UserPicturesRepository.Create(mapper.Mapper.Map<UserPicture>(entity));
        }

        public async Task<UserPictureDTO> Get(int id)
        {
            return mapper.Mapper.Map<UserPictureDTO>(await uow.UserPicturesRepository.Get(id));
        }

        public async Task<List<UserPictureDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<UserPictureDTO>>(await uow.UserPicturesRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.UserPicturesRepository.Remove(id);
        }

        public async Task Update(UserPictureDTO entity)
        {
            await uow.UserPicturesRepository.Update(mapper.Mapper.Map<UserPicture>(entity));
        }
    }
}
