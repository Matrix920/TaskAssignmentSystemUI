import { Component } from '@angular/core';
import { Observable } from 'rxjs'
import { TaskDto } from '../services/task/task.model';
import { OnInit } from '@angular/core'
import { TaskService } from '../services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { PageEvent } from '@angular/material/paginator';
import { PageResultRequst } from '../services/shared/PagedResultRequest.model';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  totalCount = 0;
  pageSizeOptions = [5, 10, 25];

  requestParams = {
    PageSize : 10,
    PageIndex: 0,
    Filter: '',
    Sort: 'name',
    Dir: 'asc'
  } as PageResultRequst;


  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent = {} as PageEvent;

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
    this.taskService.getTasks(this.requestParams).subscribe({
      next: (result) => {
        this.dataSource = result.items; 
        this.totalCount = result.totalCount;
        this.loading = false;
      },
      error: (err) => this.loading = false
    });
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

  sortData(sort: Sort) {
    if(! sort.active || sort.direction === '') return;

    this.requestParams.Sort = sort.active;
    this.requestParams.Dir = sort.direction;

    this.loadTasks();
  }

  clearSearch() {
    this.requestParams.Filter = '';
    this.loadTasks();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalCount = e.length;
    this.requestParams.PageIndex = e.pageIndex;
    this.requestParams.PageSize = e.pageSize;

    this.loadTasks();
  }
}
