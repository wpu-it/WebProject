using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using Microsoft.EntityFrameworkCore;
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

        public override async Task<News> Get(int id)
        {
            return await Table.Include(n => n.Picture).FirstOrDefaultAsync(n => n.Id == id);
        }

        public override async Task<List<News>> GetAll()
        {
            return await Table.Include(n => n.Picture).ToListAsync();
        }

        public override async Task Update(News entity)
        {
            var srchNews = await Get(entity.Id);
            srchNews.Title = entity.Title;
            srchNews.Text = entity.Text;
            Table.Update(srchNews);
            await db.SaveChangesAsync();
        }
    }
}
