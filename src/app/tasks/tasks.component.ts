import { Component } from '@angular/core';
import { Observable } from 'rxjs'
import { TaskDto } from '../services/task/task.model';
import { OnInit } from '@angular/core'
import { TaskService } from '../services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  dataSource = [] as TaskDto[];

  loading = true;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService) {
  }
  ngOnInit(): void {
   this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource = tasks;
      this.loading = false;
    },
    err => {
      this.loading = false;
    })
  }

  displayedColumns: string[] = ['No', 'Name', 'Description', 'Assignee', 'Actions'];

  assignTask(taskId: number) {
    const dialogRef = this.dialog.open(AssignTaskComponent, {
      data: {taskId},
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTasks();
    })
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTasks();
    })
  }
}
