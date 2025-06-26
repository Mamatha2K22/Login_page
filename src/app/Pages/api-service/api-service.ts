import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl);
  }

  postComment(data: any): Observable<any> {
    return this.http.post<any>(this.baseurl, data);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`);
  }

  updatePost(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/1`, data);
  }
}
