import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Employee } from './employee';
import { AppInitService } from './app-init.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private url = 'http://localhost:5200';
  private employees$: Subject<Employee[]> = new Subject();

  constructor(private httpClient: HttpClient, private config: AppInitService) {}

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.config.url}/employees`)
      .subscribe(employees => {
        this.employees$.next(employees);
      });
  }

  getEmployees(): Subject<Employee[]> {
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.config.url}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.httpClient.post(`${this.config.url}/employees`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put(`${this.config.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.config.url}/employees/${id}`, { responseType: 'text' });
  }
}
