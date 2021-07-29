using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.DTO
{
    public class AddTask
    {
        public string TaskName { get; set; }
        public string Description { get; set; }
        public string AssigneeEmail { get; set; }
        public DateTime ScheduledDate { get; set; }
       
        public DateTime EndDate { get; set; }

        public int? ProjectId { get; set; }

        public int Priority { get; set; }
       
        public string CreatedByEmail { get; set; }    
        public string Describenew { get; set; }

        public int Status { get; set; }
    }
}
