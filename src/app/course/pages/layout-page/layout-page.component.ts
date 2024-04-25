import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Institution } from 'src/app/institution/interface/institution.interface';
import { InstitutionService } from '../../../institution/services/institution.service';
import { CreateCourseInterface } from '../../interface/create-couser.interface';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2'
import { Course } from '../../interface/course.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public listInstitution: Institution[] = []
  public listCourses: Course[] = []

  public isRegister: boolean = true
  public isList: boolean = false
  public isUpdate: boolean = false

  public courseForm: FormGroup = this.FormBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)], []],
    descripcion: ['', [Validators.required, Validators.minLength(2)], []],
    carga_horaria: [0, [Validators.required, Validators.minLength(1)], []],
    InstitucionId: [0, [Validators.required], []]
  })
  public courseUpdateFom: FormGroup = this.FormBuilder.group({
    id: [0, [Validators.required,], []],
    nombre: ['', [Validators.required,], []],
    descripcion: ['', [Validators.required,], []],
    carga_horaria: [0, [Validators.required,], []],
    InstitucionId: [0, [Validators.required,], []],
    updatedAt: ['', [Validators.required,], []],
    createdAt: ['', [Validators.required,], []],

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

  viewAllCourses() {
    this.isRegister = false
    this.isList = true
    this.isUpdate = false
    this.CourseService.getAllCourses()
      .subscribe({
        next: (response) => {
          this.listCourses = response
          console.log({ response })
        },
        error: (err) => {
          console.log({ err })
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


  seeRegister() {
    this.isRegister = true
    this.isList = false
    this.isUpdate = false
  }
  seeUpdate() {
    this.isRegister = false
    this.isList = false
    this.isUpdate = true

  }

  updateCourse(id: number) {
    this.seeUpdate()
    this.CourseService.getOneCourse(id)
      .subscribe({
        next: (response) => {
          console.log({response})
          this.courseUpdateFom.patchValue({
            id: response.id,
            nombre: response.nombre,
            descripcion: response.descripcion,
            carga_horaria: response.carga_horaria,
            InstitucionId: response.InstitucionId,
            updatedAt: response.updatedAt,
            createdAt: response.createdAt,
          })
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  onUpdate() {
    const { id,nombre, descripcion, carga_horaria } = this.courseUpdateFom.value
    const updateCourse = {nombre,descripcion,carga_horaria}
    this.CourseService.updateCourse(id,updateCourse)
    .subscribe({
      next:()=>{
        Swal.fire('','Actualizacion con exito','success')
      },
      error:(err)=>{
        Swal.fire('','Error al actualizar','error')
        console.log({err})
      }
    })
  }

  onDelete(id:number){
    this.CourseService.deleteOneCourse(id)
    .subscribe({
      next:()=>{
        this.listCourses = this.listCourses.filter(course => course.id !== id);
        Swal.fire('','Eliminacion con exito','success')
      },
      error:(err)=>{
        Swal.fire('','Error al eliminar','error')
        console.log({err})
      }
    })

  }

}
