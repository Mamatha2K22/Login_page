import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  findall(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl).pipe(map(element=>element.map(ele=>({
      id:ele.id,
      userId:ele.userId,
      title:ele.title,
      body:ele.body
    })))
  )
}

find(id: number): Observable<any> {
    return this.http.get<any[]>(this.baseurl).pipe(map(element=>element.map(ele=>({
      id:ele.id
  })))
)
}
}