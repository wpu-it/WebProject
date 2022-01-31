using AutoMapper;
using FanToursAPI.Business.DTO;
using FanToursAPI.Models.Auth;
using FanToursAPI.Models.FanTour;
using FanToursAPI.Models.Order;
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
            CreateMap<FanTourDTO, FanTourModel>().ReverseMap();
            CreateMap<CreateFanTourModel, FanTourDTO>().ReverseMap();
            CreateMap<OrderDTO, OrderModel>().ReverseMap();
            CreateMap<CreateOrderModel, OrderDTO>().ReverseMap();
        }
    }
}
