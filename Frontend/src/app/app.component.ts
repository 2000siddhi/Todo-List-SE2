import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './_services/account.service';
import { TaskManagerService } from './_services/task-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-client';

  constructor(private accountService:AccountService,private taskManagerService:TaskManagerService,private router:Router){
  this.accountService.setCurrentUser(JSON.parse(localStorage.getItem('user')));
  this.taskManagerService.getAllUsers();
}
}
