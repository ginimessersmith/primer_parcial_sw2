import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../course/services/course.service';
import { UserService } from '../../../user/services/user.service';
import { Course } from 'src/app/course/interface/course.interface';
import { User } from 'src/app/auth/interfaces/user.interface';
import { LoginResponse } from '../../../auth/interfaces/login-response.interface';
import swal from 'sweetalert2'
import { InscriptionService } from '../../services/inscription.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public listCourses: Course[] = []
  public listUsers: User[] = []
  public isRegister:boolean=true
  public isList:boolean=false

  public inscriptionForm: FormGroup = this.formBuilder.group({
    UsuarioId: ['', [Validators.required], []],
    CursoId: ['', [Validators.required], []]
  })

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private userService: UserService,
    private inscriptionService:InscriptionService,
  ) { }
  ngOnInit(): void {
    this.courseService.getAllCourses()
      .subscribe({
        next: (response) => {
          this.listCourses = response
        },
        error: (err) => {
          console.log(err)
        }
      })

    this.userService.getAllUsers()
      .subscribe({
        next: (responser) => {
          this.listUsers = responser
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }

  onInscription() {
    const { UsuarioId, CursoId } = this.inscriptionForm.value
    const createInscription  = {UsuarioId:+UsuarioId,CursoId:+CursoId}
    this.inscriptionService.create(createInscription)
    .subscribe({
      next:(response)=>{
        swal.fire('','Creado con exito','success')
      },
      error:(err)=>{
        console.log(err)
        swal.fire('','Error al crear la inscripcion','error')
      }
    })
  }

  seeRegister(){
    this.isList=false
    this.isRegister=true
  }

  seeList(){
    this.isList=true
    this.isRegister=false
  }
}
