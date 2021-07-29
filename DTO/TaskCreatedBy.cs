using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//"id": 4,
//    "name": "Aashish's First task -Manoj",
//    "scheduledDate": "2021-07-22T09:21:50.443",
//    "assignee": 1006,
//    "priority": "2021-07-12T09:21:50.443",
//    "updateDate": "2021-07-02T14:54:27.313",
//    "recordDate": "2021-07-02T14:54:27.313",
//    "createdBy": 1010,
//    "assigneeNavigation": null,

namespace TodoApplication.DTO
{
    public class TaskCreatedBy
    {
        public int TaskId { get; set; }
        public int Assignee { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
