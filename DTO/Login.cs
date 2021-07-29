using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.DTO
{
    public class Login
    {
        [Required]
        public string Email { get; set; }
        [Required,MinLength(8)]
        public string Password { get; set; }
    }
}
