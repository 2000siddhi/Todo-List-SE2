using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApplication.Models;

namespace TodoApplication.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
