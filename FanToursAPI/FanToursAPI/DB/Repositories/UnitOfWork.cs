using FanToursAPI.DB.EF;
using FanToursAPI.DB.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        DatabaseContext db;
        FanToursRepository _fanToursRepository;
        OrdersRepository _ordersRepository;
        UsersRepository _usersRepository;

        public FanToursRepository FanToursRepository =>
            _fanToursRepository ?? (_fanToursRepository = new FanToursRepository(db));

        public OrdersRepository OrdersRepository =>
            _ordersRepository ?? (_ordersRepository = new OrdersRepository(db));

        public UsersRepository UsersRepository =>
            _usersRepository ?? (_usersRepository = new UsersRepository(db));

        public UnitOfWork(DatabaseContext db)
        {
            this.db = db;
        }
    }
}
