export class Project{
    id: number;
    name:string;
    describe:string;

    constructor(user:Object){
        Object.assign(this,user);
    }
}