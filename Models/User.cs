using System;
using System.Collections.Generic;

#nullable disable

namespace TodoApplication.Models
{
    public partial class User
    {
        public User()
        {
            ProjectTaskAssigneeNavigations = new HashSet<ProjectTask>();
            ProjectTaskCreatedByNavigations = new HashSet<ProjectTask>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public DateTime RecordDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool? ActiveStatus { get; set; }

        public virtual ICollection<ProjectTask> ProjectTaskAssigneeNavigations { get; set; }
        public virtual ICollection<ProjectTask> ProjectTaskCreatedByNavigations { get; set; }
    }
}
