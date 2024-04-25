import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInstitutionInterface } from '../interface/create-institution.interface';
import { Observable } from 'rxjs';
import { Institution } from '../interface/institution.interface';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private baseUrl: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient
  ) { }

  registerInstitution(CreateInstitutionInterface:CreateInstitutionInterface):Observable<Institution>{
    const url = `${this.baseUrl}/institution/`
    return this.httpClient.post<Institution>(url,CreateInstitutionInterface)
  }

  viewAllInstitutions():Observable<Institution[]>{
    const url = `${this.baseUrl}/institution/`
    return this.httpClient.get<Institution[]>(url)
  }

  delete(id:number):Observable<boolean>{
    const url = `${this.baseUrl}/institution/${id}`
    return this.httpClient.delete<boolean>(url)

  }
}
