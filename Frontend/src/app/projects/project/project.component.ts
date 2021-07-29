import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/_models/project.model';
import { ProjectManagerService } from 'src/app/_services/project-manager.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit,OnDestroy {
  projectName: string;
  projectDescribe : string;

  @Input()
  project: Project;

  @Input()
  isEdit: Boolean;

  @ViewChild('addProjectForm')
  addProjectForm:NgForm;
  
  constructor(private projectService: ProjectManagerService) { }
 

  ngOnInit():void {
  }

  ngOnChanges(): void {
    if(this.project != null) {
      this.projectName = this.project.name;
      this.projectDescribe = this.project.describe;
    } else {
      this.projectName = "";
      this.projectDescribe ="";
    }
  }

  ngOnDestroy(){
   
  }
 
  processProject(){
    if (this.isEdit) {
      this.project.name = this.projectName;
      this.project.describe = this.projectDescribe;
      this.projectService.editProject(this.project, this.project.id);
    } else {
      var project = new Project({name: this.projectName});
      this.projectService.addNewProject(project);
    }
  }
}
