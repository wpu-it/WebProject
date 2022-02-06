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
            var users = await _usersService.GetAll();
            if(users != null)
            {
                foreach (var user in users)
                {
                    if (user.Email == model.Email) return new JwtResponse { AccessToken = "" };
                }
            }
            var newUser = mapper.Mapper.Map<UserModel>(model);
            newUser.Password = md5Service.Hash(model.Password);
            await _usersService.Create(mapper.Mapper.Map<UserDTO>(newUser));
            return new JwtResponse { AccessToken = jwtService.GenerateAccessToken(newUser.Email), Role = "user" };
        }

        public async Task<JwtResponse> Login(LoginModel model)
        {
            var users = await _usersService.GetAll();
            var user = users.FirstOrDefault(u => u.Email.Equals(model.Email) && u.Password.Equals(md5Service.Hash(model.Password)));
            if (user is null) return new JwtResponse { AccessToken = "" };
            string role;
            if (user.IsAdmin) role = "admin";
            else role = "user";
            return new JwtResponse { AccessToken = jwtService.GenerateAccessToken(user.Email), Role = role };
        }
    }
}
