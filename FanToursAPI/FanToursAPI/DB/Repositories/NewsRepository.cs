using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class NewsRepository : BaseRepository<News>
    {
        public NewsRepository(DatabaseContext db) : base(db)
        {
        }

        public override async Task Update(News entity)
        {
            var srchNews = await Get(entity.Id);
            srchNews.Title = entity.Title;
            srchNews.Text = entity.Text;
            srchNews.PhotoUrl = entity.PhotoUrl;
            Table.Update(srchNews);
            await db.SaveChangesAsync();
        }
    }
}
