using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TodoApplication.DTO
{
    public class Registrations
    {
        public partial class User
        {
            public int UserId { get; set; }

            [Required(ErrorMessage = "Required.")]
            public string Username { get; set; }

            [Required(ErrorMessage = "Required.")]
            public string Password { get; set; }

            [Required(ErrorMessage = "Required.")]
            [Compare("Password", ErrorMessage = "Passwords do not match.")]
            public string ConfirmPassword { get; set; }

            [Required(ErrorMessage = "Required.")]
            [EmailAddress(ErrorMessage = "Invalid email address.")]
            public string Email { get; set; }

            public System.DateTime CreatedDate { get; set; }

            public Nullable<System.DateTime> LastLoginDate { get; set; }
        }
    }

}

