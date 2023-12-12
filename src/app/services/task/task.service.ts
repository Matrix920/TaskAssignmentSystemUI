import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../shared/url';
import { TaskDto } from './task.model';
import { CreateTaskDto } from './createTask.model';
import { PagedResult } from '../shared/pagedResult.model';
import { PageResultRequst } from '../shared/PagedResultRequest.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { 
    
  }

  getTasks(req: PageResultRequst): Observable<PagedResult<TaskDto>> {
    let params = `filter=${req.Filter}&pageSize=${req.PageSize}&pageIndex=${req.PageIndex}&sort=${req.Sort}&dir=${req.Dir}`
    return this.httpClient.get<PagedResult<TaskDto>>(`${URL}Tasks?${params}`);
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
