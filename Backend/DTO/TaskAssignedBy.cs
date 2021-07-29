using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.DTO
{
    public class TaskAssignedBy
    {
        public int TaskId { get; set; }
        public int CreatedBy { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
