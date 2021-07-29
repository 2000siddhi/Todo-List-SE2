import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { TaskManagerService } from '../_services/task-manager.service';
import {map} from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { TaskGeneric } from '../_models/task-models/task-generic-model';
import { User } from '../_models/user.model';
import { TaskAssignedTo } from '../_models/task-models/task-assigned-to.model';


@Component({
  selector: 'app-viewassigned',
  templateUrl: './viewassigned.component.html',
  styleUrls: ['./viewassigned.component.css']
})
export class ViewassignedComponent implements OnInit {

  createdBy:TaskGeneric[]=[];
  assignedTo: TaskGeneric[]=[];
  filterList: TaskGeneric[] = [];
  searchList: TaskGeneric[] = [];
  taskList: TaskGeneric[] = [];
  selectedTask: TaskGeneric;
  userName:string;
  email:string;
    taskName: string;
    taskDescription : string;
    id:number
    search: string;
    priorityFilter: number;
    sortConfig: number;
    status:number;
    users:User[];
  scheduledDate: string;
  assigneeId: number;
  assignee: string;
  endDate: string;
  priority: number;
  project: number;
  TaskAssignedToForm: any;
  

  constructor(private route:ActivatedRoute,private router:Router,private accountService:AccountService,private TMService:TaskManagerService) { }

  ngOnInit(): void {
    
    this.accountService.currentUser$.subscribe((user)=>{
      if(user){
      this.userName=user.firstName;
      this.email=user.email
      }
      this.TMService.currentEditTask.subscribe(id=>this.id=id);
    })

    this.TMService.getAssignedTo(this.email)
    .subscribe(
      tasks=> {
        tasks.map((task) => {
          this.accountService.getUserById(task.createdBy)
          .subscribe((data: User) => {
            task.createdByName = data.firstName;
          })
        })
        this.taskList = tasks;
        this.assignedTo=tasks;
      }
    );
   this.TMService.currentEditTask.subscribe(id=>this.id=id);
    this.priorityFilter = -1;
    this.sortConfig = 0;
  }

  // toAssignedTask(id:number){
  //   this.router.navigate(['../viewassigned',id],{relativeTo:this.route});
  // }

  // toAssignedTask(id:number){
  //   this.id=id;
  //   this.selectedTask = this.createdBy[id-1];
  // }

  toAssignedTask(id:number){
    this.id=id;
    this.selectedTask = this.assignedTo[id-1];
    console.log(this.selectedTask);
  }
  // onDelete(id: number) {
  //   if(confirm("Are you sure you want to delete task ?")) {
  //     this.id=id;
  //     this.TMService.deleteTask(id);
  //   }
  // }
  onActive(id: number){
    console.log("Clicked");
  }
  processTask(){
    let user;
    this.accountService.currentUser$.subscribe(u => user=u);
    console.log(this.TaskAssignedToForm);
    var task = new TaskAssignedTo({
      taskName:this.TaskAssignedToForm.value.taskName,
      description:this.TaskAssignedToForm.value.taskDescription,
      assigneeEmail:this.assignee,
      scheduledDate:this.TaskAssignedToForm.value.scheduledDate,
      endDate:this.TaskAssignedToForm.value.endDate,
      priority: this.priority,
      status: this.TaskAssignedToForm.status,
      createdByEmail: user.email,
      projectId: this.TaskAssignedToForm.value.project == -1 ? null : this.TaskAssignedToForm.value.project
    });
  }

  // onSave(){
  //   let user;
  //   this.accountService.currentUser$.subscribe(u => user=u);
  //  // console.log(this.addTaskForm);
  //   var task = new AddTask({
   
  //     status: this.status,
     
  //     projectId: this.addTaskForm.value.project == -1 ? null : this.addTaskForm.value.project
  //   });
  //   console.log(task);
  //   if (this.isEdit)
  //     this.taskManagerService.editTask(task, this.task.id);
  //   else 
  //     this.taskManagerService.addNewTask(task);
  // }
  
  onSearch(listToSearch: TaskGeneric[] = this.taskList) {
    this.searchList = [];
    if (this.search === "" || this.search === undefined) {
      this.searchList = listToSearch;
    } else {
      var searchKeyword = this.search.toLowerCase();
      listToSearch.map((task) => {
        if (task.name.toLowerCase().includes[searchKeyword]="keyword" ||
            task.assigneeName.toLowerCase().includes(searchKeyword) ||
            task.scheduledDate.toString().split("T")[0].includes(searchKeyword) ||
            task.endDate.toString().split("T")[0].includes(searchKeyword) ) {
          this.searchList.push(task);

        }
      })
    } 
    
    this.onFilterByPriority(this.searchList);
    //console.log(this.searchList);
  }

  onFilterByPriority(listToFilter: TaskGeneric[] = this.taskList) {
    if(this.priorityFilter > 0)
      this.filterList = listToFilter.filter((task) => task.priority == this.priorityFilter);
    else 
      this.filterList = listToFilter;

    this.onSort(this.filterList);
    console.log(this.filterList);

  }

  onSort(listToSort: TaskGeneric[] = this.taskList) {
    let attrToSort = Math.abs(this.sortConfig);
    if (attrToSort === 1) {
      listToSort.sort((a, b) => a.name.localeCompare(b.name));
    } else if (attrToSort === 2) {
      listToSort.sort((a, b) => a.scheduledDate.toString().split("T")[0].localeCompare(b.scheduledDate.toString().split("T")[0]));
    } else if (attrToSort === 3) {
      listToSort.sort((a, b) => a.endDate.toString().split("T")[0].localeCompare(b.endDate.toString().split("T")[0]));
    }
    if (this.sortConfig < 0) {
      listToSort = listToSort.reverse();
    }
    
    this.assignedTo = listToSort;
    console.log(listToSort);
  }

}























// import { Component, OnInit } from '@angular/core';
// import { AccountService } from '../_services/account.service';
// import { TaskManagerService } from '../_services/task-manager.service';
// import {map} from 'rxjs/operators'
// import { ActivatedRoute, Router } from '@angular/router';
// import { TaskGeneric } from '../_models/task-models/task-generic-model';
// import { User } from '../_models/user.model';


// @Component({
//   selector: 'app-viewassigned',
//   templateUrl: './viewassigned.component.html',
//   styleUrls: ['./viewassigned.component.css']
// })
// export class ViewassignedComponent implements OnInit {
//   createdBy:TaskGeneric[]=[];
//   filterList: TaskGeneric[] = [];
//   searchList: TaskGeneric[] = [];
//   taskList: TaskGeneric[] = [];
//   selectedTask: TaskGeneric;
//   userName:string;
//   taskDescription : string;
//   email:string;
//   id:number
//   search: string;
//   priorityFilter: number;
//   sortConfig: number;
//   status:number;
//   assignedTo:number;

//   constructor(private route:ActivatedRoute,private router:Router,private accountService:AccountService,private TMService:TaskManagerService) { }

//   ngOnInit(): void {
//     this.accountService.currentUser$.subscribe((user)=>{
//       if(user){
//       this.userName=user.firstName;
//       this.email=user.email
//     }
//     this.selectedTask = null;
//     })
   
    



   
   
//     this.TMService.getAssignedTo(this.email)
//     .subscribe(
//       (tasks) => {
//         tasks.map((task) => {
//           this.accountService.getUserById(task.assignee)
//           .subscribe((data: User) => {
//             task.assigneeName = data.firstName;
//           })
//         })
//         this.taskList = tasks;
//        // this.assignedTo = tasks;
//       }
//     );
//     this.TMService.currentEditTask.subscribe(id=>this.id=id);
//     this.priorityFilter = -1;
//     this.sortConfig = 0;
//   }

//   toTask(id:number){
//     this.id=id;
//     this.selectedTask = this.assignedTo[id-1];
//   }

//   onActive(id: number){
//     console.log("Clicked");
//   }

//   onSearch(listToSearch: TaskGeneric[] = this.taskList) {
//     this.searchList = [];
//     if (this.search === "" || this.search === undefined) {
//       this.searchList = listToSearch;
//     } else {
//       var searchKeyword = this.search.toLowerCase();
//       listToSearch.map((task) => {
//         if (task.name.toLowerCase().includes(searchKeyword) ||
//             task.assigneeName.toLowerCase().includes(searchKeyword) ||
//             task.scheduledDate.toString().split("T")[0].includes(searchKeyword) ||
//             task.endDate.toString().split("T")[0].includes(searchKeyword) ) {
//           this.searchList.push(task);
//         }
//       })
//     } 
    
//     this.onFilterByPriority(this.searchList);
//   }

//   onFilterByPriority(listToFilter: TaskGeneric[] = this.taskList) {
//     if(this.priorityFilter > 0)
//       this.filterList = listToFilter.filter((task) => task.priority == this.priorityFilter);
//     else 
//       this.filterList = listToFilter;

//     this.onSort(this.filterList);
//   }

//   onSort(listToSort: TaskGeneric[] = this.taskList) {
//     let attrToSort = Math.abs(this.sortConfig);
//     if (attrToSort === 1) {
//       listToSort.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (attrToSort === 2) {
//       listToSort.sort((a, b) => a.scheduledDate.toString().split("T")[0].localeCompare(b.scheduledDate.toString().split("T")[0]));
//     } else if (attrToSort === 3) {
//       listToSort.sort((a, b) => a.endDate.toString().split("T")[0].localeCompare(b.endDate.toString().split("T")[0]));
//     }
//     if (this.sortConfig < 0) {
//       listToSort = listToSort.reverse();
//     }
    
//     this.assignedTo = listToSort;
//     console.log
//   }

// }




  