using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class UsersRepository : BaseRepository<User>
    {
        public UsersRepository(DatabaseContext db) : base(db)
        {
        }

        public override async Task<User> Get(int id)
        {
            return await Table.Include(us => us.Orders).FirstOrDefaultAsync(us => us.Id == id);
        }

        public override async Task<List<User>> GetAll()
        {
            return await Table.Include(us => us.Orders).ToListAsync();
        }

        public override async Task Update(User entity)
        {
            var srchEntity = await Get(entity.Id);
            srchEntity.Fullname = entity.Fullname;
            srchEntity.Email = entity.Email;
            srchEntity.Password = entity.Password;
            srchEntity.Discount = entity.Discount;
            Table.Update(srchEntity);
            await db.SaveChangesAsync();
        }
    }
}
