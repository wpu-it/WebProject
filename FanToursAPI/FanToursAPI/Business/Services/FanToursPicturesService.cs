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
    public class FanToursPicturesService : IService<FanTourPictureDTO>
    {
        IUnitOfWork uow;
        ObjectMapperBusiness mapper = ObjectMapperBusiness.Instance;
        public FanToursPicturesService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Create(FanTourPictureDTO entity)
        {
            await uow.FanToursPicturesRepository.Create(mapper.Mapper.Map<FanTourPicture>(entity));
        }

        public async Task<FanTourPictureDTO> Get(int id)
        {
            return mapper.Mapper.Map<FanTourPictureDTO>(await uow.FanToursPicturesRepository.Get(id));
        }

        public async Task<List<FanTourPictureDTO>> GetAll()
        {
            return mapper.Mapper.Map<List<FanTourPictureDTO>>(await uow.FanToursPicturesRepository.GetAll());
        }

        public async Task Remove(int id)
        {
            await uow.FanToursPicturesRepository.Remove(id);
        }

        public async Task Update(FanTourPictureDTO entity)
        {
            await uow.FanToursPicturesRepository.Update(mapper.Mapper.Map<FanTourPicture>(entity));
        }
    }
}
