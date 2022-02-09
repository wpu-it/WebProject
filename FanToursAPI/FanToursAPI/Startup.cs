using FanToursAPI.Business.Services;
using FanToursAPI.DB.EF;
using FanToursAPI.DB.Interfaces;
using FanToursAPI.DB.Repositories;
using FanToursAPI.Services;
using FanToursAPI.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // укзывает, будет ли валидироваться издатель при валидации токена
                            ValidateIssuer = true,
                            // строка, представляющая издателя
                            ValidIssuer = AuthOptions.ISSUER,

                            // будет ли валидироваться потребитель токена
                            ValidateAudience = true,
                            // установка потребителя токена
                            ValidAudience = AuthOptions.AUDIENCE,
                            // будет ли валидироваться время существования
                            ValidateLifetime = true,
                            ClockSkew = TimeSpan.Zero,

                            // установка ключа безопасности
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            // валидация ключа безопасности
                            ValidateIssuerSigningKey = true,
                        };
                    });
            services.AddControllers()
                .AddNewtonsoftJson(opt =>
                {
                    opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddDbContext<DatabaseContext>(opt =>
            {
                string connString = Configuration.GetConnectionString("DefaultConnection");
                opt.UseSqlServer(connString);
            });
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<FanToursService>();
            services.AddTransient<OrdersService>();
            services.AddTransient<UsersService>();
            services.AddTransient<NewsService>();
            services.AddTransient<FanToursPicturesService>();
            services.AddTransient<NewsPicturesService>();
            services.AddTransient<PicturesService>();
            services.AddTransient<UserPicturesService>();
            services.AddTransient<MD5Service>();
            services.AddTransient<AuthService>();
            services.AddTransient<JwtService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FanToursAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FanToursAPI v1"));
            }

            app.UseCors(builder =>
                            builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
