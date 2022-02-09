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
    public class FanToursService : IService<FanTourDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public FanToursService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(FanTourDTO entity)
        {
            await uow.FanToursRepository.Create(mapper.Mapper.Map<FanTour>(entity));
        }

        public async Task<FanTourDTO> Get(int id)
        {
            return mapper.Mapper.Map<FanTourDTO>(await uow.FanToursRepository.Get(id));
        }

        public async Task<List<FanTourDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<FanTourDTO>>(await uow.FanToursRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.FanToursRepository.Remove(id);
        }

        public async Task Update(FanTourDTO entity)
        {
            await uow.FanToursRepository.Update(mapper.Mapper.Map<FanTour>(entity));
        }

        public async Task<FanTourDTO> GetByTitle(string title)
        {
            var tours = await GetAll();
            foreach (var tour in tours)
            {
                if (tour.Title == title) return tour;
            }
            return null;
        }
    }
}
