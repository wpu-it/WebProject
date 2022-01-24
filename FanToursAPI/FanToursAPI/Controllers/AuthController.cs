using FanToursAPI.Business.Exceptions;
using FanToursAPI.Models.Auth;
using FanToursAPI.Models.JwtResponse;
using FanToursAPI.Services;
using Microsoft.AspNetCore.Mvc;
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
        public AuthController(AuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<JwtResponse> Login(LoginModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if(!Validator.TryValidateObject(model, context, results, true))
            {
                throw new UserIsNotValidException();
            }
            return await authService.Login(model);
        }

        [HttpPost]
        [Route("register")]
        public async Task<JwtResponse> Register(RegisterModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                throw new UserIsNotValidException();
            }
            return await authService.Register(model);
        }
    }
}
