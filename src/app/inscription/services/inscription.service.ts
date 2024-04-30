import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateInscriptionInterface } from '../interface/create-inscriptions.interface';
import { Observable, catchError, map } from 'rxjs';
import { Inscription } from '../interface/inscription.interface';
import { UpdateInscriptionInterface } from '../interface/udpate-inscription.interface';
import { UserService } from '../../user/services/user.service';
import { CourseService } from '../../course/services/course.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private baseUrl: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient,
    private userService:UserService,
    private courseService:CourseService,
  ) { }

  create(createInscription: CreateInscriptionInterface): Observable<boolean> {
    const url = `${this.baseUrl}/registration/`
    return this.httpClient.post<boolean>(url, createInscription)
  }

  getOne(id: number): Observable<Inscription> {
    const url = `${this.baseUrl}/registration/${id}`
    return this.httpClient.get<Inscription>(url)
  }

  getAll(): Observable<Inscription[]> {
    const url = `${this.baseUrl}/registration`
    return this.httpClient.get<Inscription[]>(url)
  }

  update(id: number, updateInscription: UpdateInscriptionInterface): Observable<boolean> {
    const url = `${this.baseUrl}/registration/${id}`
    return this.httpClient.put<boolean>(url, updateInscription)
  }

  delete(UsuarioId:number,CursoId: number): Observable<boolean> {
    const url = `${this.baseUrl}/registration/?UsuarioId=${UsuarioId}&CursoId=${CursoId}`;
    return this.httpClient.delete<boolean>(url)
  }

}
