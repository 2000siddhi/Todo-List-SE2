import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { ProjectsComponent } from './projects/projects.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { ProjectComponent } from './projects/project/project.component';
import { CommonModule } from '@angular/common';
import { ViewassignedComponent } from './viewassigned/viewassigned.component';
import { ViewTaskComponent } from './view-task/view-task.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TaskComponent,
    ProjectsComponent,
    LandingComponent,
    TasksComponent,
    EditTaskComponent,
    ProjectComponent,
    ViewassignedComponent,
    ViewTaskComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot({
    positionClass:"toast-bottom-right"
    }),
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
