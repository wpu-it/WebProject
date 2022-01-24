using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class FanToursRepository : BaseRepository<FanTour>
    {
        public FanToursRepository(DatabaseContext db) : base(db)
        {
        }

        public override async Task<FanTour> Get(int id)
        {
            return await Table.Include(ft => ft.Orders).FirstOrDefaultAsync(ft => ft.Id == id);
        }

        public override async Task<List<FanTour>> GetAll()
        {
            return await Table.Include(ft => ft.Orders).ToListAsync();
        }

        public override async Task Update(FanTour entity)
        {
            var srchEntity = await Get(entity.Id);
            srchEntity.Title = entity.Title;
            srchEntity.Description = entity.Description;
            srchEntity.Schedule = entity.Schedule;
            srchEntity.PriceWithTicket = entity.PriceWithTicket;
            srchEntity.PriceWithoutTicket = entity.PriceWithoutTicket;
            srchEntity.PhotoUrl = entity.PhotoUrl;
            Table.Update(srchEntity);
            await db.SaveChangesAsync();
        }
    }
}
