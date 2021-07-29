using System;
using System.Collections.Generic;

#nullable disable

namespace TodoApplication.Models
{
    public partial class Project
    {
        public Project()
        {
            ProjectTasks = new HashSet<ProjectTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Describe { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime RecordDate { get; set; }

        public virtual ICollection<ProjectTask> ProjectTasks { get; set; }
    }
}
