using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.FanTour;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        public FanToursController(FanToursService fanToursService, FanToursPicturesService fanToursPicturesService)
        {
            this.fanToursService = fanToursService;
            this.fanToursPicturesService = fanToursPicturesService;
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
            await fanToursService.Remove(id);
            await fanToursPicturesService.RemoveByFantourId(id);
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
