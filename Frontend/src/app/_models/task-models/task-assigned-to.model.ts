export class TaskAssignedTo{
    taskId:number;
    createdby:number;
    taskName:string;
    taskDescription:string;
    scheduledDate:Date;
    priorityDate:Date;
    assigneeName: string;


    constructor(task:Object){
        Object.assign(this,task);
    }
}