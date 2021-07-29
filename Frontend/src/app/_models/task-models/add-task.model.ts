export class AddTask{
    taskName:string;
    description:string;
    assigneeEmail:string;
    scheduledDate:Date;
    endDate: Date;
    priority:number;
    createdByEmail:string;
    projectId: number;
    status:number;


//     {
//   "taskName": "string",
//   "assigneeEmail": "string",
//   "scheduledDate": "2021-07-06T12:09:55.412Z",
//   "priority": "2021-07-06T12:09:55.412Z",
//   "createdByEmail": "string"
// }

    constructor(task:Object)
    {
        Object.assign(this,task);
    }
}