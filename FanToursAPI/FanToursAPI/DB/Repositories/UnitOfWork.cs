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
        NewsRepository _newsRepository;
        UserPicturesRepository _userPicturesRepository;
        FanToursPicturesRepository _fanToursPicturesRepository;
        NewsPicturesRepository _newsPicturesRepository;
        PicturesRepository _picturesRepository;

        public FanToursRepository FanToursRepository =>
            _fanToursRepository ?? (_fanToursRepository = new FanToursRepository(db));

        public OrdersRepository OrdersRepository =>
            _ordersRepository ?? (_ordersRepository = new OrdersRepository(db));

        public UsersRepository UsersRepository =>
            _usersRepository ?? (_usersRepository = new UsersRepository(db));

        public NewsRepository NewsRepository =>
            _newsRepository ?? (_newsRepository = new NewsRepository(db));

        public UserPicturesRepository UserPicturesRepository =>
            _userPicturesRepository ?? (_userPicturesRepository = new UserPicturesRepository(db));

        public FanToursPicturesRepository FanToursPicturesRepository =>
            _fanToursPicturesRepository ?? (_fanToursPicturesRepository = new FanToursPicturesRepository(db));

        public NewsPicturesRepository NewsPicturesRepository =>
            _newsPicturesRepository ?? (_newsPicturesRepository = new NewsPicturesRepository(db));

        public PicturesRepository PicturesRepository =>
            _picturesRepository ?? (_picturesRepository = new PicturesRepository(db));

        public UnitOfWork(DatabaseContext db)
        {
            this.db = db;
        }
    }
}
