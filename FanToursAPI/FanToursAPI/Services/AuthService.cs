using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Exceptions;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Auth;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.JwtResponse;
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

        public async Task<JwtResponse> Register(RegisterModel model)
        {
            var newUser = mapper.Mapper.Map<UserModel>(model);
            newUser.Password = md5Service.Hash(model.Password);
            await _usersService.Create(mapper.Mapper.Map<UserDTO>(newUser));
            return new JwtResponse { AccessToken = jwtService.GenerateAccessToken(newUser.Email) };
        }

        public async Task<JwtResponse> Login(LoginModel model)
        {
            var users = await _usersService.GetAll();
            var user = users.FirstOrDefault(u => u.Email.Equals(model.Email) && u.Password.Equals(this.md5Service.Hash(model.Password)));
            if (user is null) throw new UserNotFoundException();
            return new JwtResponse { AccessToken = jwtService.GenerateAccessToken(user.Email) };
        }
    }
}
