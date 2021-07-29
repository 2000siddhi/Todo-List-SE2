import { User } from "../user.model";

export class TaskGeneric{
    id:number;
    assignee:number;
    name:string;
    description:string;
    scheduledDate:Date;
    endDate:Date;
    priority: number;
    createdBy:number;
    assignedTo:number;
    assigneeNavigation: User;
    createdByNavigation: User;
    assigneeName: string;
    createdByName:string;
    projectId: number;
    status:number;
    

    constructor(task:Object){
        Object.assign(this,task);
    }
}