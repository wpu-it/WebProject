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
    public class PicturesService : IService<PictureDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public PicturesService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(PictureDTO entity)
        {
            await uow.PicturesRepository.Create(mapper.Mapper.Map<Picture>(entity));
        }

        public async Task<PictureDTO> Get(int id)
        {
            return mapper.Mapper.Map<PictureDTO>(await uow.PicturesRepository.Get(id));
        }

        public async Task<List<PictureDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<PictureDTO>>(await uow.PicturesRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.PicturesRepository.Remove(id);
        }

        public async Task Update(PictureDTO entity)
        {
            await uow.PicturesRepository.Update(mapper.Mapper.Map<Picture>(entity));
        }

        public async Task<PictureDTO> GetPictureByName(string name)
        {
            var pictures = await GetAll();
            if (pictures is null) return null;
            foreach (var picture in pictures)
            {
                if (picture.Name == name) return picture;
            }
            return null;
        }
    }
}
