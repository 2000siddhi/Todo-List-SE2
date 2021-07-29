import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/project.model';
import { ProjectManagerService } from '../_services/project-manager.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects:Project[]=[];
  selectedProject: Project;
  id:number
  editDialog: Boolean;

  constructor(private projectService: ProjectManagerService) { }

  ngOnInit(): void {
    this.selectedProject = null;
    this.projectService.getAllProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
    });
    this.editDialog = false;
  }

  toProject (id:number) {
    this.id=id;
    this.selectedProject = this.projects[id-1];
    this.editDialog = true;
  }

  addProject () {
    this.editDialog = false;
    this.selectedProject = null;
  }

  onDelete(id: number) {
      if(confirm("Are you sure you want to delete task ?")){
      this.id=id;
      this.projectService.deleteProject(id);
      }
  }

}
