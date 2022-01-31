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
        public FanToursController(FanToursService fanToursService)
        {
            this.fanToursService = fanToursService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllFanTours()
        {
            var fantours = await fanToursService.GetAll();
            if (fantours != null)
            {
                var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(fantours);
                return new JsonResult(mappedTours);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult> CreateFanTour([FromBody] CreateFanTourModel model)
        {
            var tour = mapper.Mapper.Map<FanTourDTO>(model);
            await fanToursService.Create(tour);
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            return new JsonResult(mappedTours);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateFanTour([FromBody] UpdateFanTourModel model)
        {
            var tour = await fanToursService.Get(model.Id);
            if (tour is null) return BadRequest();
            tour.Title = model.Title;
            tour.Description = model.Description;
            tour.Schedule = model.Schedule;
            tour.TicketPrice = model.TicketPrice;
            tour.PriceWithoutTicket = model.PriceWithoutTicket;
            tour.PhotoUrl = model.PhotoUrl;
            await fanToursService.Update(tour);
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            return new JsonResult(mappedTours);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFanTour(int id)
        {
            if (await fanToursService.Get(id) == null) return BadRequest();
            await fanToursService.Remove(id);
            var tours = await fanToursService.GetAll();
            var mappedTours = mapper.Mapper.Map<List<FanTourModel>>(tours);
            return new JsonResult(mappedTours);
        }
    }
}
