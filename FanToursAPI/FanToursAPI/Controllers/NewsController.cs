using FanToursAPI.Business.DTO;
using FanToursAPI.Business.Services;
using FanToursAPI.Models.Automapper;
using FanToursAPI.Models.News;
using FanToursAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        NewsPicturesService newsPicturesService;
        SQLProtectService sQLProtectService;
        public NewsController(NewsService newsService, NewsPicturesService newsPicturesService, SQLProtectService sQLProtectService)
        {
            this.newsService = newsService;
            this.newsPicturesService = newsPicturesService;
            this.sQLProtectService = sQLProtectService;
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<ActionResult> GetAllNews()
        {
            var news = await newsService.GetAll();
            if(news != null)
            {
                var mappedNews = mapper.Mapper.Map<List<NewsModel>>(news);
                for(int i = 0; i < news.Count; i++)
                {
                    var base64 = Convert.ToBase64String(news[i].Picture.Content);
                    var base64String = $"data:image/jpeg;base64,{base64}";
                    mappedNews[i].Photo = base64String;
                }
                return new JsonResult(mappedNews);
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult> GetNewsById(int id)
        {
            var news = await newsService.Get(id);
            if (news is null) return BadRequest("News not found");
            var mappedNews = mapper.Mapper.Map<NewsModel>(news);
            var base64 = Convert.ToBase64String(news.Picture.Content);
            var base64String = $"data:image/jpeg;base64,{base64}";
            mappedNews.Photo = base64String;
            return new JsonResult(mappedNews);
        }

        [HttpPost]
        public async Task<ActionResult> CreateNews(CreateNewsModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Title)) return BadRequest("Invalid title");
            if (!sQLProtectService.isValid(model.Text)) return BadRequest("Invalid text");
            var news = mapper.Mapper.Map<NewsDTO>(model);
            await newsService.Create(news);
            news = await newsService.GetByTitle(model.Title);
            var words = model.Photo.Split(',');
            await newsPicturesService.Create(new NewsPictureDTO { Name = $"News #{news.Id} photo", Content = Convert.FromBase64String(words[1]), NewsId = news.Id });
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            for (int i = 0; i < newS.Count; i++)
            {
                var base64 = Convert.ToBase64String(newS[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedNews[i].Photo = base64String;
            }
            return new JsonResult(mappedNews);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveNews(int id)
        {
            if (await newsService.Get(id) == null) return BadRequest();
            await newsService.Remove(id);
            await newsPicturesService.RemoveByNewsId(id);
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            for (int i = 0; i < newS.Count; i++)
            {
                var base64 = Convert.ToBase64String(newS[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedNews[i].Photo = base64String;
            }
            return new JsonResult(mappedNews);
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateNews(UpdateNewsModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            if (!sQLProtectService.isValid(model.Title)) return BadRequest("Invalid title");
            if (!sQLProtectService.isValid(model.Text)) return BadRequest("Invalid text");
            var news = await newsService.Get(model.Id);
            if (news is null) return BadRequest("News not found");
            news.Title = model.Title;
            news.Text = model.Text;
            await newsService.Update(news);
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            for (int i = 0; i < newS.Count; i++)
            {
                var base64 = Convert.ToBase64String(newS[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedNews[i].Photo = base64String;
            }
            return new JsonResult(mappedNews);
        }

        [HttpPut]
        [Route("update/photo")]
        public async Task<ActionResult> UpdateNewsPhoto(UpdateNewsPhotoModel model)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(model);
            if (!Validator.TryValidateObject(model, context, results, true))
            {
                return BadRequest("Validation error");
            }
            var news = await newsService.Get(model.NewsId);
            if (news is null) return BadRequest("News not found");
            var words = model.NewPhoto.Split(',');
            await newsPicturesService.Remove(news.Picture.Id);
            await newsPicturesService.Create(new NewsPictureDTO { Name = $"News #{news.Id} photo", Content = Convert.FromBase64String(words[1]), NewsId = news.Id });
            var newS = await newsService.GetAll();
            var mappedNews = mapper.Mapper.Map<List<NewsModel>>(newS);
            for (int i = 0; i < newS.Count; i++)
            {
                var base64 = Convert.ToBase64String(newS[i].Picture.Content);
                var base64String = $"data:image/jpeg;base64,{base64}";
                mappedNews[i].Photo = base64String;
            }
            return new JsonResult(mappedNews);
        }
    }
}
