using FanToursAPI.DB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Interfaces
{
    public interface IUnitOfWork
    {
        FanToursRepository FanToursRepository { get; }
        OrdersRepository OrdersRepository { get; }
        UsersRepository UsersRepository { get; }
        NewsRepository NewsRepository { get; }
    }
}
