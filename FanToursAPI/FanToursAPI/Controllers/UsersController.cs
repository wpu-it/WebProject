using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Auth;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.JwtResponse;
using FanToursAPI.Models.Order;
using FanToursAPI.Models.User;
using FanToursAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : Controller
    {
        ObjectMapperModels mapper = ObjectMapperModels.Instance;
        UsersService usersService;
        UserPicturesService userPicturesService;
        MD5Service mD5Service;
        OrdersService ordersService;
        SQLProtectService sQLProtectService;
        JwtService jwtService;
        public UsersController(UsersService usersService, UserPicturesService userPicturesService, MD5Service mD5Service, OrdersService ordersService,
            SQLProtectService sQLProtectService, JwtService jwtService)
        {
            this.usersService = usersService;
            this.userPicturesService = userPicturesService;
            this.mD5Service = mD5Service;
            this.ordersService = ordersService;
            this.sQLProtectService = sQLProtectService;
            this.jwtService = jwtService;
        }

        [HttpGet]
        [Route("get-by-token")]
        public async Task<ActionResult> GetUserByAccessToken(string accessToken)
        {
            var user = await usersService.GetUserByAccessToken(accessToken);
            if (user is null) return BadRequest("User not found");
            var mappedUser = mapper.Mapper.Map<UserModel>(user);
            if(user.Picture != null)
            {
                var base64 = Convert.ToBase64String(user.Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedUser.Photo = base64String;
            }
            return new JsonResult(mappedUser);
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateUser(UpdateUserModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Fullname)) return BadRequest("Invalid full name");
            if (!sQLProtectService.isValid(model.Email)) return BadRequest("Invalid email");
            var user = await usersService.Get(model.Id);
            if (user is null) return BadRequest("User not found.");
            if (await usersService.IsEmailExists(model.Email, model.Id)) return BadRequest("Same email already exists.");
            user.Fullname = model.Fullname;
            user.Email = model.Email;
            user.Discount = model.Discount;
            await usersService.Update(user);
            var mappedUser = mapper.Mapper.Map<UserModel>(user);
            var base64 = Convert.ToBase64String(user.Picture.Content);
            var base64String = $"data:image/jpeg;base64,{base64}";
            mappedUser.Photo = base64String;
            return new JsonResult(mappedUser);
        }

        [HttpPut]
        [Route("update/email")]
        public async Task<ActionResult> UpdateUserEmail(UpdateUserModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Fullname)) return BadRequest("Invalid full name");
            if (!sQLProtectService.isValid(model.Email)) return BadRequest("Invalid email");
            var user = await usersService.Get(model.Id);
            if (user is null) return BadRequest("User not found.");
            if (await usersService.IsEmailExists(model.Email, model.Id)) return BadRequest("Same email already exists.");
            await ordersService.UpdateConsEmail(user.Email, model.Email);
            user.Email = model.Email;
            await usersService.Update(user);
            return new JsonResult(new JwtResponse { AccessToken = jwtService.GenerateAccessToken(model.Email), Role = "user" });
        }

        [HttpGet]
        [Route("get-orders")]
        public async Task<ActionResult> GetUserOrders(int userId)
        {
            var user = await usersService.Get(userId);
            if (user is null) return BadRequest("User not found.");
            var res = new List<OrderModel>();
            var orders = await ordersService.GetAll();
            if (orders is null) orders = new List<OrderDTO>();
            foreach (var order in orders)
            {
                if (order.ConsEmail == user.Email) res.Add(mapper.Mapper.Map<OrderModel>(order));
            }
            return new JsonResult(res);
        }

        [HttpPut]
        [Route("update/photo")]
        public async Task<ActionResult> UpdateUserPhoto(UpdateUserPhotoModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            var user = await usersService.Get(model.UserId);
            if (user is null) return BadRequest("User not found.");
            var words = model.NewPhoto.Split(',');
            await userPicturesService.Remove(user.Picture.Id);
            await userPicturesService.Create(new UserPictureDTO { Name = $"{user.Email} photo", Content = Convert.FromBase64String(words[1]), UserId = user.Id });
            user = await usersService.Get(model.UserId);
            var mappedUser = mapper.Mapper.Map<UserModel>(user);
            var base64 = Convert.ToBase64String(user.Picture.Content);
            var base64String = $"data:image/jpeg;base64,{base64}";
            mappedUser.Photo = base64String;
            return new JsonResult(mappedUser);
        }

        [HttpPut]
        [Route("update/password")]
        public async Task<ActionResult> ChangeUserPassword(ChangePasswordModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.NewPassword)) return BadRequest("Invalid new password");
            var user = await usersService.Get(model.UserId);
            if (user is null) return BadRequest("User not found.");
            if (user.Password != mD5Service.Hash(model.OldPassword)) return BadRequest("Old password is not correct");
            if (user.Password == mD5Service.Hash(model.NewPassword)) return BadRequest("Password wasn't changed");
            user.Password = mD5Service.Hash(model.NewPassword);
            await usersService.Update(user);
            var mappedUser = mapper.Mapper.Map<UserModel>(user);
            var base64 = Convert.ToBase64String(user.Picture.Content);
            var base64String = $"data:image/jpeg;base64,{base64}";
            mappedUser.Photo = base64String;
            return new JsonResult(mappedUser);
        }

        
    }
}
