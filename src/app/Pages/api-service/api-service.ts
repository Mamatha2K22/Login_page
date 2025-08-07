import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

 getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(this.baseurl);
}


find(id: number): Observable<any> {
    return this.http.get<any[]>(this.baseurl).pipe(map(element=>element.map(ele=>({
      id:ele.id
  })))
)
}
}