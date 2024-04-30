import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { OneUserGet } from '../interfaces/one-user.interface';
import { AsistantResponse } from '../interfaces/assitant-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:3000'
  constructor(
    private httpClient: HttpClient
  ) { }

  getOneUser(id: number): Observable<OneUserGet> {
    const url = `${this.baseUrl}/user/${id}`
    return this.httpClient.get<OneUserGet>(url)
  }

  newAssistant(): Observable<String> {
    const url = `${this.baseUrl}/assistant/create-thread`
    const body={}
    return this.httpClient.post<String>(url,body)
  }

  sendMessage(question:string,id:string):Observable<AsistantResponse[]>{
    const url = `${this.baseUrl}/assistant/user-question`
    const body = {
      threadId:id,
      question
    }

    return this.httpClient.post<AsistantResponse[]>(url,body)
  }

  getAllUsers():Observable<User[]>{
    const url = `${this.baseUrl}/user/`
    return this.httpClient.get<User[]>(url)
  }


}
