import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../shared/url';
import { TaskDto } from './task.model';
import { CreateTaskDto } from './createTask.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { 
    
  }

  getTasks(): Observable<TaskDto[]> {
    return this.httpClient.get<TaskDto[]>(`${URL}Tasks`);
  }

  createTask(task: CreateTaskDto): Observable<TaskDto> {
    return this.httpClient.post<TaskDto>(`${URL}Tasks`, task);
  }

  assignTask(taskId: number, employeeId: number){
    return this.httpClient.post(`${URL}Tasks/assign?employeeId=${employeeId}&taskId=${taskId}`, {employeeId, taskId});
  }

  getTask(taskId: number): Observable<TaskDto> {
    return this.httpClient.get<TaskDto>(`${URL}Tasks/single?id=${taskId}`);
  }
}
