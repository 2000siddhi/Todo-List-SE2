using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApplication.DTO;
using TodoApplication.Models;

namespace TodoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectTasksController : ControllerBase
    {
        private readonly todoContext _context;

        public object prop { get; private set; }

        public ProjectTasksController(todoContext context)
        {
            _context = context;
        }

        // GET: api/ProjectTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetProjectTasks()
        {
            return await _context.ProjectTasks.ToListAsync();
        }

        // GET: api/ProjectTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTask>> GetProjectTask(int id)
        {
            ProjectTask projectTask = await _context.ProjectTasks.FindAsync(id);

            if (projectTask == null)
            {
                return NotFound();
            }

            return projectTask;
        }

        [HttpPost("createTask")]
        public async Task<ActionResult<string>> CreateTask(AddTask task)
        {
            List<User> user = await _context.Users
                .FromSqlRaw("select * from Users where Email={0}", task.AssigneeEmail).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Assignee Username");
            int AssigneeId = user.FirstOrDefault().Id;

            user = await _context.Users
                .FromSqlRaw("select * from Users where Email={0}", task.CreatedByEmail).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Creator Username");
            int CreatedById = user.FirstOrDefault().Id;

            ProjectTask PostTask = new ProjectTask
            {
                Assignee = AssigneeId,
                CreatedBy = CreatedById,
                Name = task.TaskName,
                EndDate = task.EndDate,
                ScheduledDate = task.ScheduledDate,
                ProjectId = task.ProjectId,
                Priority = task.Priority,
                Description = task.Description,
                Status = task.Status,

            };
            _context.ProjectTasks.Add(PostTask);
            int numberOfTask = await _context.SaveChangesAsync();

            return Ok("Task Created: " + PostTask.Name);
        }

        [HttpPost("editTask")]
        public async Task<ActionResult<string>> CreateTask(int id, AddTask task)
        {
            List<User> user = await _context.Users.FromSqlRaw("select * from Users where Email={0}", task.AssigneeEmail).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Assignee Username");
            int AssigneeId = user.FirstOrDefault().Id;

            user = await _context.Users.FromSqlRaw("select * from Users where Email={0}", task.CreatedByEmail).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Creator Username");
            int CreatedById = user.FirstOrDefault().Id;



            ProjectTask result = _context.ProjectTasks.SingleOrDefault(b => b.Id == id);
            if (result != null)
            {
                result.Assignee = AssigneeId;
                result.CreatedBy = CreatedById;
                result.Name = task.TaskName;
                result.Description = task.Description;
                result.EndDate = task.EndDate;
                result.ProjectId = task.ProjectId;
                result.ScheduledDate = task.ScheduledDate;
                result.Priority = task.Priority;
                result.UpdateDate = DateTime.Now;
                result.Status = task.Status;
                await _context.SaveChangesAsync();
                return Ok("Task Edit: " + task.TaskName);
            }



            return NotFound("The task to be editted was not found");

        }

        [HttpGet("createdBy")]
        public async Task<ActionResult<List<ProjectTask>>> CreatedBy([FromQuery] string Email)
        {
            List<User> user = await _context.Users
                .FromSqlRaw("select * from Users where Email={0}", Email).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Assignee Username");
            int CreatedById = user.FirstOrDefault().Id;

            List<ProjectTask> createdByTasks = await _context.ProjectTasks
                .FromSqlRaw("select * from ProjectTasks where CreatedBy={0}", CreatedById).ToListAsync();
            return createdByTasks;
        }

        [HttpGet("assignedTo")]
        public async Task<ActionResult<List<ProjectTask>>> assignedTo([FromQuery] string Email)
        {
            List<User> user = await _context.Users
                .FromSqlRaw("select * from Users where Email={0}", Email).ToListAsync();
            if (user.FirstOrDefault() == null) return BadRequest("Invalid Assignee Username");
            int assignedId = user.FirstOrDefault().Id;
            List<ProjectTask> assignedTasks = await _context.ProjectTasks
                .FromSqlRaw("select * from ProjectTasks where Assignee={0}", assignedId).ToListAsync();
            return assignedTasks;
        }

        [HttpGet("allUsers")]
        public async Task<ActionResult<List<AllUsersForAddTask>>> GetAllUsers()
        {
            List<User> users = await _context.Users.ToListAsync(); ;

            List<AllUsersForAddTask> taskUsers = new List<AllUsersForAddTask>();

            foreach (User item in users)
            {
                AllUsersForAddTask temp = new AllUsersForAddTask
                {
                    Email = item.Email,
                    FirstName = item.FirstName,
                    LastName = item.LastName
                };
                taskUsers.Add(temp);
            }

            return taskUsers;
        }


        // PUT: api/ProjectTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectTask(int id, ProjectTask projectTask)
        {
            if (id != projectTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTaskExists(id))
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

        [HttpPut("changeStatus/{id}")]
        public async Task<IActionResult> changeStatus(int id, ProjectTask projectTask)
        {
            if (id != projectTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("The task was completed");
        }

        // POST: api/ProjectTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProjectTask>> PostProjectTask(ProjectTask projectTask)
        {
            _context.ProjectTasks.Add(projectTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectTask", new { id = projectTask.Id }, projectTask);
        }

        // DELETE: api/ProjectTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            ProjectTask projectTask = await _context.ProjectTasks.FindAsync(id);
            if (projectTask == null)
            {
                return NotFound();
            }

            _context.ProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectTaskExists(int id)
        {
            return _context.ProjectTasks.Any(e => e.Id == id);
        }
    }
}
