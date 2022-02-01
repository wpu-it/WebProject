using AutoMapper;
using FanToursAPI.Business.DTO;
using FanToursAPI.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Business.Automapper.Profiles
{
    public class MappingProfileBusiness : Profile
    {
        public MappingProfileBusiness()
        {
            CreateMap<FanTour, FanTourDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<News, NewsDTO>().ReverseMap();
        }
    }
}
