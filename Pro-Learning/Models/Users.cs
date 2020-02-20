using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pro_Learning.Models
{
    public class UserList
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class Users
    {
        public List<UserList> UserList { get; set; }
    }
}