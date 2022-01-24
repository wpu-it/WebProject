using AutoMapper;
using FanToursAPI.Business.DTO;
using FanToursAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Models.Automapper.Profiles
{
    public class MappingProfileModels : Profile
    {
        public MappingProfileModels()
        {
            CreateMap<UserDTO, UserModel>().ReverseMap();
            CreateMap<UserModel, RegisterModel>().ReverseMap();
        }
    }
}
