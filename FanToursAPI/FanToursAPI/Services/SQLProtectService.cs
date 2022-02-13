using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanToursAPI.Services
{
    public class SQLProtectService
    {
        List<string> badWords = new List<string>
        {
            "DROP", "DELETE", "DATABASE",  "USERS", "FANTOURS", "ORDERS", "NEWS", "PICTURES",
            "USERPICTURES", "FANTOURPICTURES", "NEWSPICTURES"
        };

        public bool isValid(string str)
        {
            str = str.ToUpper();
            foreach (var badWord in badWords)
            {
                if (str.Contains(badWord)) return false;
            }
            return true;
        }
    }
}
