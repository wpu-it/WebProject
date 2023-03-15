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
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //byte[] logoContent;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Football-goal-score.jpg", FileMode.Open))
            //{
            //    logoContent = new byte[fs.Length];
            //    fs.Read(logoContent, 0, logoContent.Length);
            //}

            //byte[] welcomeContent;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\colourbox15033372.jpg", FileMode.Open))
            //{
            //    welcomeContent = new byte[fs.Length];
            //    fs.Read(welcomeContent, 0, welcomeContent.Length);
            //}

            //byte[] backContent;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Background.jpg", FileMode.Open))
            //{
            //    backContent = new byte[fs.Length];
            //    fs.Read(backContent, 0, backContent.Length);
            //}

            //byte[] adminContent;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Admin.jpg", FileMode.Open))
            //{
            //    adminContent = new byte[fs.Length];
            //    fs.Read(adminContent, 0, adminContent.Length);
            //}

            //byte[] facebookLogo;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Facebook logo.jpg", FileMode.Open))
            //{
            //    facebookLogo = new byte[fs.Length];
            //    fs.Read(facebookLogo, 0, facebookLogo.Length);
            //}

            //byte[] instaLogo;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Insta logo.jpg", FileMode.Open))
            //{
            //    instaLogo = new byte[fs.Length];
            //    fs.Read(instaLogo, 0, instaLogo.Length);
            //}

            //byte[] twitterLogo;
            //using (FileStream fs = new FileStream(@"C:\Users\prim5\Downloads\Twitter logo.jpg", FileMode.Open))
            //{
            //    twitterLogo = new byte[fs.Length];
            //    fs.Read(twitterLogo, 0, twitterLogo.Length);
            //}

            //modelBuilder.Entity<User>().HasData(new User[]
            //{
            //    new User { Id = 1, Email = "admin@gmail.com", Password = mD5Service.Hash("admin"), IsAdmin = true }
            //});

            //modelBuilder.Entity<Picture>().HasData(new Picture[]
            //{
            //    new Picture { Id = 1, Name = "Logo", Content = logoContent },
            //    new Picture { Id = 2, Name = "Welcome", Content = welcomeContent },
            //    new Picture { Id = 3, Name = "Background", Content = backContent },
            //    new Picture { Id = 4, Name = "Admin dashboard", Content = adminContent},
            //    new Picture { Id = 5, Name = "Facebook logo", Content = facebookLogo},
            //    new Picture { Id = 6, Name = "Insta logo", Content = instaLogo},
            //    new Picture { Id = 7, Name = "Twitter logo", Content = twitterLogo}
            //});
        }
    }
}
