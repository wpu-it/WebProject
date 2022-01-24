using FanToursAPI.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Interfaces
{
    public interface IRepositoryAsync<T>
        where T : BaseEntity
    {
        Task Create(T entity);
        Task<T> Get(int id);
        Task<List<T>> GetAll();
        Task Remove(int id);
        Task Update(T entity);
    }
}
