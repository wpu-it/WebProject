using FanToursAPI.DB.Entities;
using FanToursAPI.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.DB.EF
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<FanTour> FanTours { get; set; }
        public DbSet<Order> Orders { get; set; }

        MD5Service mD5Service;
        public DatabaseContext(DbContextOptions<DatabaseContext> options, MD5Service mD5Service)
            : base(options)
        {
            this.mD5Service = mD5Service;
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User { Id = 1, Email = "admin@gmail.com", Password = this.mD5Service.Hash("admin"), IsAdmin = true }
            });
        }
    }
}
