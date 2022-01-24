using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class OrdersRepository : BaseRepository<Order>
    {
        public OrdersRepository(DatabaseContext db) : base(db)
        {
        }

        public override async Task<Order> Get(int id)
        {
            return await Table.Include(ord => ord.FanTour).FirstOrDefaultAsync(ord => ord.Id == id);
        }

        public override async Task<List<Order>> GetAll()
        {
            return await Table.Include(ord => ord.FanTour).ToListAsync();
        }

        public override async Task Update(Order entity)
        {
            var srchEntity = await Get(entity.Id);
            srchEntity.ConsFullname = entity.ConsFullname;
            srchEntity.ConsEmail = entity.ConsEmail;
            srchEntity.ConsPhoneNumber = entity.ConsPhoneNumber;
            Table.Update(srchEntity);
            await db.SaveChangesAsync();
        }
    }
}
