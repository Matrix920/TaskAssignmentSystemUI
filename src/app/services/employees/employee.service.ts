import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../../models/employees/employee.model';
import { URL } from '../shared/url';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<EmployeeDto[]> {
    return this.httpClient.get<EmployeeDto[]>(`${URL}Employees/List`);
  }
}
