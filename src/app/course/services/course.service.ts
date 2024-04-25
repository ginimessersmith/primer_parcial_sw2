import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCourseInterface } from '../interface/create-couser.interface';
import { Course } from '../interface/course.interface';
import { UpdateCourseInterface } from '../interface/update-course.interface';

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

  getAllCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/course/`
    return this.httpClient.get<Course[]>(url)
  }

  updateCourse(id: number, updateCourse: UpdateCourseInterface): Observable<boolean> {
    const url = `${this.baseUrl}/course/${id}`
    return this.httpClient.put<boolean>(url, updateCourse)
  }

  getOneCourse(id: number): Observable<Course> {
    const url = `${this.baseUrl}/course/${id}`
    return this.httpClient.get<Course>(url)
  }

  deleteOneCourse(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/course/${id}`
    return this.httpClient.delete<boolean>(url)
  }
}
