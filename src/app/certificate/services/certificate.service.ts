import { Injectable } from '@angular/core';
import { CourseService } from '../../course/services/course.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCertificate } from '../interface/create-certificate.interface';
import { Certificate } from '../interface/certificate.interface';
import { UpdateCertificate } from '../interface/update-certificate.interface';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private baseUrl: string = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  createCertificate(createCertificate: CreateCertificate): Observable<boolean> {
    const url = `${this.baseUrl}/certificate`
    return this.http.post<boolean>(url, createCertificate)
  }

  getAllCertificates():Observable<Certificate[]>{
    const url =`${this.baseUrl}/certificate`
    return this.http.get<Certificate[]>(url)
  }

  getOneCertificate(id:number):Observable<Certificate>{
    const url =`${this.baseUrl}/certificate/${id}`
    return this.http.get<Certificate>(url)
  }

  updateCertificate(id:number, update:UpdateCertificate):Observable<boolean>{
    const url =`${this.baseUrl}/certificate/${id}`
    console.log(url)
    console.log({id,update})
    return this.http.put<boolean>(url,update)
  }

  deleteCertificate(id:number):Observable<boolean>{
    const url =`${this.baseUrl}/certificate/${id}`
    return this.http.delete<boolean>(url)
  }


}
