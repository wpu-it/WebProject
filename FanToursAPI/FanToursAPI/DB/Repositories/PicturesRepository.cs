using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class PicturesRepository : BaseRepository<Picture>
    {
        public PicturesRepository(DatabaseContext db) : base(db)
        {
        }

        public override async Task Update(Picture entity)
        {
            var srchEntity = await Get(entity.Id);
            srchEntity.Content = entity.Content;
            srchEntity.Name = entity.Name;
            Table.Update(srchEntity);
            await db.SaveChangesAsync();
        }
    }
}
