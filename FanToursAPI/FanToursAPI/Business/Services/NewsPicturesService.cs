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
    public class NewsPicturesService : IService<NewsPictureDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public NewsPicturesService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(NewsPictureDTO entity)
        {
            await uow.NewsPicturesRepository.Create(mapper.Mapper.Map<NewsPicture>(entity));
        }

        public async Task<NewsPictureDTO> Get(int id)
        {
            return mapper.Mapper.Map<NewsPictureDTO>(await uow.NewsPicturesRepository.Get(id));
        }

        public async Task<List<NewsPictureDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<NewsPictureDTO>>(await uow.NewsPicturesRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.NewsPicturesRepository.Remove(id);
        }

        public async Task Update(NewsPictureDTO entity)
        {
            await uow.NewsPicturesRepository.Update(mapper.Mapper.Map<NewsPicture>(entity));
        }

        public async Task RemoveByNewsId(int newsId)
        {
            var pics = await GetAll();
            foreach (var pic in pics)
            {
                if (pic.NewsId == newsId) await Remove(pic.Id);
            }
        }
    }
}
