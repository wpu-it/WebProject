using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class NewsPicturesRepository : BaseRepository<NewsPicture>
    {
        public NewsPicturesRepository(DatabaseContext db) : base(db)
        {
        }

        public override async Task Update(NewsPicture entity)
        {
            var srchEntity = await Get(entity.Id);
            srchEntity.Content = entity.Content;
            srchEntity.Name = entity.Name;
            Table.Update(srchEntity);
            await db.SaveChangesAsync();
        }
    }
}
