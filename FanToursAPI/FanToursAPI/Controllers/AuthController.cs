using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Exceptions;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Auth;
using FanToursAPI.Models.JwtResponse;
using FanToursAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        AuthService authService;
        UserPicturesService userPicturesService;
        UsersService usersService;
        SQLProtectService sQLProtectService;
        public AuthController(AuthService authService, UserPicturesService userPicturesService, UsersService usersService, SQLProtectService sQLProtectService)
        {
            this.authService = authService;
            this.userPicturesService = userPicturesService;
            this.usersService = usersService;
            this.sQLProtectService = sQLProtectService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if(!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            var response = await authService.Login(model);
            if (response.AccessToken == "") return BadRequest("Sign in failed");
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Fullname)) return BadRequest("Invalid full name");
            if (!sQLProtectService.isValid(model.Email)) return BadRequest("Invalid email");
            if (!sQLProtectService.isValid(model.Password)) return BadRequest("Invalid password");
            var response = await authService.Register(model);
            if (response.AccessToken == "") return BadRequest("User already exists");
            var user = await usersService.GetUserByAccessToken(response.AccessToken);
            var words = model.Photo.Split(',');
            await userPicturesService.Create(new UserPictureDTO { Name = $"{user.Email} photo", Content = Convert.FromBase64String(words[1]), UserId = user.Id });
            return new JsonResult(response);
        }
    }
}
