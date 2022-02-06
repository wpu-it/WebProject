using FanToursAPI.Business.Services;
using FanToursAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [ApiController]
    [Route("api/pictures")]
    public class PicturesController : Controller
    {
        PicturesService picturesService;
        public PicturesController(PicturesService picturesService)
        {
            this.picturesService = picturesService;
        }

        [HttpGet]
        public async Task<ActionResult> GetPictureByName(string name)
        {
            var picture = await picturesService.GetPictureByName(name);
            if (picture is null) return BadRequest("Picture wasn't found");
            var base64 = Convert.ToBase64String(picture.Content);
            var base64String = $"data:image/jpeg;base64,{base64}";
            return new JsonResult(new PictureModel { Url = base64String });
        }
    }
}
