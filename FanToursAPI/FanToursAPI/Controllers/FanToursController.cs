using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.FanTour;
using FanToursAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [Route("api/fantours")]
    [ApiController]
    public class FanToursController : Controller
    {
        ObjectMapperModels mapper = ObjectMapperModels.Instance;
        FanToursService fanToursService;
        FanToursPicturesService fanToursPicturesService;
        OrdersService ordersService;
        SQLProtectService sQLProtectService;
        UsersService usersService;
        public FanToursController(FanToursService fanToursService, FanToursPicturesService fanToursPicturesService,
            OrdersService ordersService, SQLProtectService sQLProtectService, UsersService usersService)
        {
            this.fanToursService = fanToursService;
            this.fanToursPicturesService = fanToursPicturesService;
            this.ordersService = ordersService;
            this.sQLProtectService = sQLProtectService;
            this.usersService = usersService;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<ActionResult> GetAllFanTours()
        {
            var fantours = await fanToursService.GetAll();
            if (fantours != null)
            {
                var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(fantours);
                for (int i = 0; i < fantours.Count; i++)
                {
                    var base64 = Convert.ToBase64String(fantours[i].Picture.Content);
                    var base64String = $"data:image/jpeg;base64,{base64}";
                    mappedTours[i].Photo = base64String;
                }
                return new JsonResult(mappedTours);
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult> GetFanTourById(int id)
        {
            var tour = await fanToursService.Get(id);
            if (tour is null) return BadRequest("Tour not found");
            var mappedTour = mapper.Mapper.Map<FanTourModel>(tour);
            var base64 = Convert.ToBase64String(tour.Picture.Content);
            var base64String = $"data:image/jpeg;base64,{base64}";
            mappedTour.Photo = base64String;
            return new JsonResult(mappedTour);
        }

        [HttpPost]
        public async Task<ActionResult> CreateFanTour([FromBody] CreateFanTourModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Title)) return BadRequest("Invalid title");
            if (!sQLProtectService.isValid(model.Description)) return BadRequest("Invalid description");
            if (!sQLProtectService.isValid(model.Schedule)) return BadRequest("Invalid schedule");
            var tour = mapper.Mapper.Map<FanTourDTO>(model);
            await fanToursService.Create(tour);
            tour = await fanToursService.GetByTitle(model.Title);
            var words = model.Photo.Split(',');
            await fanToursPicturesService.Create(new FanTourPictureDTO { Name = $"Fan tour #{tour.Id} photo", Content = Convert.FromBase64String(words[1]), FanTourId = tour.Id });
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            for(int i = 0; i < tours.Count; i++)
            {
                var base64 = Convert.ToBase64String(tours[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedTours[i].Photo = base64String;
            }
            return new JsonResult(mappedTours);
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateFanTour([FromBody] UpdateFanTourModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Title)) return BadRequest("Invalid title");
            if (!sQLProtectService.isValid(model.Description)) return BadRequest("Invalid description");
            if (!sQLProtectService.isValid(model.Schedule)) return BadRequest("Invalid schedule");
            var tour = await fanToursService.Get(model.Id);
            if (tour is null) return BadRequest("Tour not found");
            tour.Title = model.Title;
            tour.Description = model.Description;
            tour.Schedule = model.Schedule;
            tour.TicketPrice = model.TicketPrice;
            tour.PriceWithoutTicket = model.PriceWithoutTicket;
            tour.Quantity = model.Quantity;
            await fanToursService.Update(tour);
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            for (int i = 0; i < tours.Count; i++)
            {
                var base64 = Convert.ToBase64String(tours[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedTours[i].Photo = base64String;
            }
            return new JsonResult(mappedTours);
        }

        [HttpPut]
        [Route("update/photo")]
        public async Task<ActionResult> UpdateFantoursPhoto(UpdateFantourPhotoModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            var tour = await fanToursService.Get(model.FanTourId);
            if (tour is null) return BadRequest("Tour not found");
            var words = model.NewPhoto.Split(',');
            await fanToursPicturesService.Remove(tour.Picture.Id);
            await fanToursPicturesService.Create(new FanTourPictureDTO { Name = $"Fan tour #{tour.Id} photo", Content = Convert.FromBase64String(words[1]), FanTourId = tour.Id });
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            for (int i = 0; i < tours.Count; i++)
            {
                var base64 = Convert.ToBase64String(tours[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedTours[i].Photo = base64String;
            }
            return new JsonResult(mappedTours);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFanTour(int id)
        {
            if (await fanToursService.Get(id) == null) return BadRequest("Tour not found");
            await fanToursPicturesService.RemoveByFantourId(id);
            var orders = await ordersService.GetAllByTourId(id);
            foreach (var order in orders)
            {
                var user = await usersService.GetUserByEmail(order.ConsEmail);
                if (user != null)
                {
                    user.Discount -= (order.FanTour.PriceWithoutTicket + order.FanTour.TicketPrice) * 0.5m / 100;
                    await usersService.Update(user);
                }
            }
            await ordersService.RemoveByFantourId(id);
            await fanToursService.Remove(id);
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            for (int i = 0; i < tours.Count; i++)
            {
                var base64 = Convert.ToBase64String(tours[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedTours[i].Photo = base64String;
            }
            return new JsonResult(mappedTours);
        }
    }
}
