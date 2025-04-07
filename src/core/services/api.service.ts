import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostCard} from '../interfaces/post-card';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApiTools(url: string): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(url);
  }
}
