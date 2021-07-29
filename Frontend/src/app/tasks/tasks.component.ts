import { Component, OnInit } from '@angular/core';
import { TaskGeneric } from '../_models/task-models/task-generic-model';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { TaskManagerService } from '../_services/task-manager.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  createdBy:TaskGeneric[]=[];
  filterList: TaskGeneric[] = [];
  searchList: TaskGeneric[] = [];
  taskList: TaskGeneric[] = [];
  selectedTask: TaskGeneric;
  userName:string;
  taskDescription : string;
  email:string;
  id:number
  search: string;
  priorityFilter: number;
  sortConfig: number;
  status:number;


  constructor(
    private accountService:AccountService,
    private TMService:TaskManagerService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user)=>{
      if(user){
      this.userName=user.firstName;
      this.email=user.email
    }
    this.selectedTask = null;
    })
    this.TMService.getCreatedBy(this.email)
    .subscribe(
      (tasks) => {
        tasks.map((task) => {
          this.accountService.getUserById(task.assignee)
          .subscribe((data: User) => {
            task.assigneeName = data.firstName;
          })
        })
        this.taskList = tasks;
        this.createdBy = tasks;
      }
    );
    this.TMService.currentEditTask.subscribe(id=>this.id=id);
    this.priorityFilter = -1;
    this.sortConfig = 0;
  }

  toTask(id:number){
    this.id=id;
    this.selectedTask = this.createdBy[id-1];
  }

  onDelete(id: number) {
    if(confirm("Are you sure you want to delete task ?")) {
      this.id=id;
      this.TMService.deleteTask(id);
    }
  }
  onActive(id: number){
    console.log("Clicked");
  }

  onSearch(listToSearch: TaskGeneric[] = this.taskList) {
    this.searchList = [];
    if (this.search === "" || this.search === undefined) {
      this.searchList = listToSearch;
    } else {
      var searchKeyword = this.search.toLowerCase();
      listToSearch.map((task) => {
        if (task.name.toLowerCase().includes(searchKeyword) ||
            task.assigneeName.toLowerCase().includes(searchKeyword) ||
            task.scheduledDate.toString().split("T")[0].includes(searchKeyword) ||
            task.endDate.toString().split("T")[0].includes(searchKeyword) ) {
          this.searchList.push(task);
        }
      })
    } 
    
    this.onFilterByPriority(this.searchList);
  }

  onFilterByPriority(listToFilter: TaskGeneric[] = this.taskList) {
    if(this.priorityFilter > 0)
      this.filterList = listToFilter.filter((task) => task.priority == this.priorityFilter);
    else 
      this.filterList = listToFilter;

    this.onSort(this.filterList);
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
    
    this.createdBy = listToSort;
  }

}
