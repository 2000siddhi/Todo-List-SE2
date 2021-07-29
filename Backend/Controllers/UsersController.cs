using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApplication.DTO;
using TodoApplication.Interfaces;
using TodoApplication.Models;
using TodoApplication.Services;

namespace TodoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly todoContext _context;
        private readonly ITokenService _tokenService;

        public UsersController(todoContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        //{
        //"Username":"aashish.prasad@gmail.com",
        //"Password":"Ganesh99"

        //}

        [HttpPost("login")]
        public async Task<ActionResult<LoggedIn>> Login(Login login)
        {
            //var query = await _context.Users
            //                      .FirstOrDefaultAsync(s => s.Email == login.Email && s.Password == login.Password);
            List<User> user = await _context.Users.FromSqlRaw("select * from Users where Email={0}", login.Email).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Username");
            if (user.FirstOrDefault().Password != login.Password) return BadRequest("Invalid Password");
            User user1 = user.FirstOrDefault();
            LoggedIn loggedUser = new LoggedIn
            {
                Email = user1.Email,
                FirstName = user1.FirstName,
                LastName = user1.LastName,
                Token = _tokenService.CreateToken(user1)
            };
            return loggedUser;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
