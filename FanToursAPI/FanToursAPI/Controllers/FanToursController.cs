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
            if(fantours != null)
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
    }
}
