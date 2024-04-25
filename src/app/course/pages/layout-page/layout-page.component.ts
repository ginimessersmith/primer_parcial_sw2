import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Institution } from 'src/app/institution/interface/institution.interface';
import { InstitutionService } from '../../../institution/services/institution.service';
import { CreateCourseInterface } from '../../interface/create-couser.interface';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public listInstitution: Institution[] = []

  public courseForm: FormGroup = this.FormBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)], []],
    descripcion: ['', [Validators.required, Validators.minLength(2)], []],
    carga_horaria: [0, [Validators.required, Validators.minLength(1)], []],
    InstitucionId: [0, [Validators.required], []]
  })

  constructor(
    private router: Router,
    private FormBuilder: FormBuilder,
    private InstitutionService: InstitutionService,
    private CourseService: CourseService,

  ) { }

  ngOnInit(): void {
    this.loadInstitution()
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }

  loadInstitution() {
    this.InstitutionService.viewAllInstitutions()
      .subscribe({
        next: (response) => {
          this.listInstitution = response
        },
        error: (error) => {
          console.log({ error })
        }
      })
  }

  registerCourse() {
    const { nombre, descripcion, carga_horaria, InstitucionId } = this.courseForm.value
    const createCourse: CreateCourseInterface = { nombre, descripcion, carga_horaria: +carga_horaria, InstitucionId: +InstitucionId }
    this.CourseService.createCourse(createCourse)
      .subscribe({
        next: (response) => {
          Swal.fire('', 'Creado con exito', 'success')
        },
        error: (error) => {
          console.log({ error })
          Swal.fire('', 'Error al crear el curos', 'error')
        }
      })
  }

}
