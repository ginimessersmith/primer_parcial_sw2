import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCourseInterface } from '../interface/create-couser.interface';
import { Course } from '../interface/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient
  ) { }

  createCourse(createCourseInterface: CreateCourseInterface): Observable<boolean> {
    const url = `${this.baseUrl}/course/`
    return this.httpClient.post<boolean>(url, createCourseInterface)

  }

  getAllCourses():Observable<Course[]>{
    const url = `${this.baseUrl}/course/`
    return this.httpClient.get<Course[]>(url)
  }
}
