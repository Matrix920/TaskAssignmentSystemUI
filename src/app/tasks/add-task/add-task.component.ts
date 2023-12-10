import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeDto} from '../../services/employee/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {  MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task/task.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CreateTaskDto } from 'src/app/services/task/createTask.model';
import { TaskDto } from 'src/app/services/task/task.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: "outline"}}
  ]
})
export class AddTaskComponent implements OnInit {

  validation = {
    name : null,
    desciption : null,
  };

  config = {
    duration: 2000
  } as MatSnackBarConfig;

  task = {} as TaskDto;
  form = {} as FormGroup ; 
  employees$ = {}  as Observable<EmployeeDto[]>;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private readonly snackBar: MatSnackBar,
    private readonly employeeService: EmployeeService,
    private readonly tasksService: TaskService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
    this.buildForm();
  }



  buildForm() {
    this.form = this.fb.group({
      name: [ this.task?.name || '', [Validators.required]],
      description: [ this.task?.description ||'', Validators.required],
      employeeId: [this.task.employeeId || null],
    });
  }

  save() {
    if(! this.form.valid) return;

    let task: CreateTaskDto = this.form.value;
    this.tasksService.createTask(task).subscribe((t: any) => {
      if(t.id){
        this.snackBar.open(`Task Creation`, "Success", this.config);
      }
      else{
        this.snackBar.open(`Task Creation`, "Failed", this.config);
      }

      this.dialogRef.close();
    })
  }
}
