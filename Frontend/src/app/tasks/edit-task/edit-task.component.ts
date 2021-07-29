import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskManagerService } from 'src/app/_services/task-manager.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit,OnDestroy {

  subsc :Subscription;
  taskNumber:number;
  constructor(private route:ActivatedRoute,private taskManagerService:TaskManagerService) { }
  
  ngOnInit(): void {
    this.subsc= this.route.params.subscribe(data=>{this.taskNumber=data['id'];});
    this.taskManagerService.currentEditTask.next(this.taskNumber);
  }
  
  ngOnDestroy(): void {
   this.subsc.unsubscribe();
  }
}
