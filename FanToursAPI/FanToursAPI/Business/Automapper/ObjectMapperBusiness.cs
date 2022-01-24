using AutoMapper;
using FanToursAPI.Business.Automapper.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.Automapper
{
    public class ObjectMapperBusiness
    {
        private IMapper mapper;
        public IMapper Mapper => mapper;
        private static ObjectMapperBusiness _instance;
        public static ObjectMapperBusiness Instance
            => _instance ?? (_instance = new ObjectMapperBusiness());

        private ObjectMapperBusiness()
        {
            var mapCnfg = new MapperConfiguration(cnfg =>
            {
                cnfg.AddProfile(new MappingProfileBusiness());
            });
            mapper = mapCnfg.CreateMapper();
        }
    }
}
