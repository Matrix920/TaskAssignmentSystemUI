import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EmployeeDto } from 'src/app/models/employees/employee.model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { TaskDto } from 'src/app/models/tasks/task.model';
import { TaskService } from 'src/app/services/tasks/task.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  config = {
    duration: 2000
  } as MatSnackBarConfig
  employees$ = {} as Observable<EmployeeDto[]>;
  employeeId : number | undefined;
  task = {} as TaskDto;
  constructor(
    public dialogRef: MatDialogRef<AssignTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {taskId: number},
    private readonly employeeService: EmployeeService,
    private readonly snackBar: MatSnackBar,
    private readonly tasksService: TaskService) {
  }



  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
    if(this.data.taskId){
      this.getTask(this.data.taskId);
    }
  }

  save() {
    if(!this.data.taskId || !this.task.employeeId) return;

    this.tasksService.assignTask(this.data.taskId, this.task.employeeId)
    .subscribe((res: any) => {
      if(res.success){
        this.snackBar.open(`Employee Assignment`, "Success", this.config);
      }
      else{
        this.snackBar.open(`Employee Assignment`, "Failed", this.config);
      }
      this.dialogRef.close();
    });
  }


  getTask(taskId: number) {
    this.tasksService.getTask(taskId)
      .subscribe(t => {
        this.task = t;
      });
  }

}

