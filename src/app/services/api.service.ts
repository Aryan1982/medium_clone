import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allusers`);
  }

  loginUser(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/login`,userData);
  }

  registerUser(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/register`,userData);
  }
  
  submitArticle(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/submitArticle`,userData);
  }

  getLoginUser(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/getLoginUser`,userData);
  }

  getAllArticles(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/getAllArticles`,userData);
  }

  getArticelById(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/getArticleById`,userData);
  }

  getArticleByUserId(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/articleByUserId`,userData);
  }

  getUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}/user/allUsers`);
  }

  getUserByUserId(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user/userByUserId`,userData);
  }

}
