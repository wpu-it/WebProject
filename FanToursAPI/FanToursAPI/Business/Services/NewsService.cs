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
    public class NewsService : IService<NewsDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public NewsService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(NewsDTO entity)
        {
            await uow.NewsRepository.Create(mapper.Mapper.Map<News>(entity));
        }

        public async Task<NewsDTO> Get(int id)
        {
            return mapper.Mapper.Map<NewsDTO>(await uow.NewsRepository.Get(id));
        }

        public async Task<List<NewsDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<NewsDTO>>(await uow.NewsRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.NewsRepository.Remove(id);
        }

        public async Task Update(NewsDTO entity)
        {
            await uow.NewsRepository.Update(mapper.Mapper.Map<News>(entity));
        }

        public async Task<NewsDTO> GetByTitle(string title)
        {
            var news = await GetAll();
            foreach (var newS in news)
            {
                if (newS.Title == title) return newS;
            }
            return null;
        }
    }
}
