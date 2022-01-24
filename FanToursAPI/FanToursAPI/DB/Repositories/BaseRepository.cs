using FanToursAPI.DB.EF;
using FanToursAPI.DB.Entities;
using FanToursAPI.DB.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public abstract class BaseRepository<T> : IRepositoryAsync<T>
        where T : BaseEntity
    {
        protected DatabaseContext db;
        protected DbSet<T> Table => db.Set<T>();

        public BaseRepository(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task Create(T entity)
        {
            Table.Add(entity);
            await db.SaveChangesAsync();
        }

        public virtual async Task<T> Get(int id)
        {
            return await Table.FirstOrDefaultAsync(ent => ent.Id == id);
        }

        public virtual async Task<List<T>> GetAll()
        {
            return await Table.ToListAsync();
        }

        public async Task Remove(int id)
        {
            var entity = await Get(id);
            Table.Remove(entity);
            await db.SaveChangesAsync();
        }

        public abstract Task Update(T entity);
    }
}
