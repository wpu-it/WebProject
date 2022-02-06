using FanToursAPI.DB.Entities;
using FanToursAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.IO;

namespace FanToursAPI.DB.EF
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<FanTour> FanTours { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<UserPicture> UserPictures { get; set; }
        public DbSet<FanTourPicture> FanTourPictures { get; set; }
        public DbSet<NewsPicture> NewsPictures { get; set; }

        MD5Service mD5Service;
        public DatabaseContext(DbContextOptions<DatabaseContext> options, MD5Service mD5Service)
            : base(options)
        {
            this.mD5Service = mD5Service;
            //Database.EnsureDeleted();
            //Database.EnsureCreated();

            //Just an example
            //User user = new User { Email = "admin@gmail.com", Password = mD5Service.Hash("admin"), IsAdmin = true };
            //Users.Add(user);
            //UserPicture picture = new UserPicture { Name = "Logo", Content = logoContent, User = user };
            //UserPictures.Add(picture);
            //SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            byte[] logoContent;
            using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Football-goal-score.jpg", FileMode.Open))
            {
                logoContent = new byte[fs.Length];
                fs.Read(logoContent, 0, logoContent.Length);
            }

            byte[] welcomeContent;
            using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\colourbox15033372.jpg", FileMode.Open))
            {
                welcomeContent = new byte[fs.Length];
                fs.Read(welcomeContent, 0, welcomeContent.Length);
            }

            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User { Id = 1, Email = "admin@gmail.com", Password = mD5Service.Hash("admin"), IsAdmin = true }
            });

            modelBuilder.Entity<Picture>().HasData(new Picture[]
            {
                new Picture { Id = 1, Name = "Logo", Content = logoContent },
                new Picture { Id = 2, Name = "Welcome", Content = welcomeContent }
            });
        }
    }
}
