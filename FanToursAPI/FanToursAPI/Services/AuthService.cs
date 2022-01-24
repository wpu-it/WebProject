using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Services
{
    public class AuthService
    {
        ObjectMapperModels mapper = ObjectMapperModels.Instance;
        UsersService _usersService;
        MD5Service md5Service;
        JwtService jwtService;
        public AuthService(UsersService usersService, MD5Service md5Service, JwtService jwtService)
        {
            _usersService = usersService;
            this.md5Service = md5Service;
            this.jwtService = jwtService;
        }
    }
}
