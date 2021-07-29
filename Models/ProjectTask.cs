using System;
using System.Collections.Generic;

#nullable disable

namespace TodoApplication.Models
{
    public partial class ProjectTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ScheduledDate { get; set; }
        public int Assignee { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime RecordDate { get; set; }
        public int CreatedBy { get; set; }
        public int Priority { get; set; }
        public int? ProjectId { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }

        public virtual User AssigneeNavigation { get; set; }
        public virtual User CreatedByNavigation { get; set; }
        public virtual Project Project { get; set; }
    }
}
