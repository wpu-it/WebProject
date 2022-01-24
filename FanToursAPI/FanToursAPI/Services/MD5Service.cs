using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FanToursAPI.Services
{
    public class MD5Service
    {
        public string Hash(string str)
        {
            var buff = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(str));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < buff.Length; i++)
            {
                sb.Append(buff[i].ToString("x2"));
            }
            return sb.ToString();
        }
    }
}
