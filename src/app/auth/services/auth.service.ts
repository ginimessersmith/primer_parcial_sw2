import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CreateUserRequest } from '../interfaces/create-user-request.interface';
import { CreateUserResponse } from '../interfaces/create-user-response.interface';
import { CreateUserError } from '../interfaces/create-user-error.interface';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000'
  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(createUser: CreateUserRequest): Observable<CreateUserResponse> {
    console.log('register user execute')
    const url = `${this.baseUrl}/user`
    // console.log({createUser})

    return this.httpClient.post<CreateUserResponse>(url, createUser)
  }

  login(LoginRequest:LoginRequest):Observable<LoginResponse>{
   const url = `${this.baseUrl}/user/login/`
    return this.httpClient.post<LoginResponse>(url,LoginRequest)
    .pipe(
      tap(
        (response)=>{
          console.log('auth execute')
          // console.log({response})
          // console.log({user:response})
        }
      ),
      // map(()=>true),
      catchError((err)=>{
        return throwError(()=>err )
      })
    )
  }
}
