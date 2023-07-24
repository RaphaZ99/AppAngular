import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/interfaces/job';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }
 
  GetAll(): Observable<Job[]>{
    return this.http.get<Job[]>(`${environment.url}/jobs`);
  }
  PostSector(job: Job) : Observable<any>{
    return this.http.post<Job>(`${environment.url}/jobs`, job, httpOptions);
  }

}
