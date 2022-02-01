using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.News;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Controllers
{
    [Route("api/news")]
    [ApiController]
    public class NewsController : Controller
    {
        ObjectMapperModels mapper = ObjectMapperModels.Instance;
        NewsService newsService;
        public NewsController(NewsService newsService)
        {
            this.newsService = newsService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllNews()
        {
            var news = await newsService.GetAll();
            if(news != null)
            {
                var mappedNews = mapper.Mapper.Map<List<NewsModel>>(news);
                return new JsonResult(mappedNews);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult> CreateNews(CreateNewsModel model)
        {
            var news = mapper.Mapper.Map<NewsDTO>(model);
            await newsService.Create(news);
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            return new JsonResult(mappedNews);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveNews(int id)
        {
            if (await newsService.Get(id) == null) return BadRequest();
            await newsService.Remove(id);
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            return new JsonResult(mappedNews);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateNews(UpdateNewsModel model)
        {
            var news = await newsService.Get(model.Id);
            if (news is null) return BadRequest();
            news.Title = model.Title;
            news.Text = model.Text;
            news.PhotoUrl = model.PhotoUrl;
            await newsService.Update(news);
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            return new JsonResult(mappedNews);
        }
    }
}
