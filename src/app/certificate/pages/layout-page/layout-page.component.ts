import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/course/interface/course.interface';
import { CourseService } from 'src/app/course/services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCertificate } from '../../interface/create-certificate.interface';
import { CertificateService } from '../../services/certificate.service';
import Swal from 'sweetalert2'
import { Certificate } from '../../interface/certificate.interface';
import { UpdateCertificate } from '../../interface/update-certificate.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public listCourses: Course[] = []
  public oneCertificate!: Certificate
  public listCertificate: Certificate[] = []
  public isRegister: boolean = true
  public isList: boolean = false
  public isUpdate: boolean = false

  public certificateForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(2)], []],
    descripcion: ['', [Validators.required, Validators.minLength(2)], []],
    fecha_emision: ['', [Validators.required, Validators.minLength(2)], []],
    CursoId: [0, [Validators.required], []],
    UsuarioId: [0, [Validators.required], []],

  })

  public certificateUpdateForm: FormGroup = this.formBuilder.group({
    id: [0, [Validators.required], []],
    titulo: ['', [Validators.required, Validators.minLength(2)], []],
    descripcion: ['', [Validators.required, Validators.minLength(2)], []],
    fecha_emision: ['', [Validators.required, Validators.minLength(2)], []],
    CursoId: [0, [Validators.required], []],
    UsuarioId: [0, [Validators.required], []],

  })

  constructor(
    private router: Router,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private certificateService: CertificateService,
  ) { }
  ngOnInit(): void {
    this.loadCourses()
    this.getAllCertificate()
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }

  loadCourses() {
    this.courseService.getAllCourses()
      .subscribe((response) => {
        this.listCourses = response
      })
  }

  registerCertificate() {
    this.isRegister = true
    this.isList = false
    this.isUpdate = false
    const { titulo, descripcion, fecha_emision, CursoId, UsuarioId, } = this.certificateForm.value
    const user = localStorage.getItem('user')
    let usuarioIdLocal
    if (user) {
      usuarioIdLocal = JSON.parse(user)
    } else {
      console.log('error el user no existe en el localstorage')
    }

    const createCertificate: CreateCertificate = { titulo, descripcion, fecha_emision, CursoId: +CursoId, UsuarioId: +usuarioIdLocal.id }
    this.certificateService.createCertificate(createCertificate)
      .subscribe({
        next: () => {
          Swal.fire('', 'Se registro con exito', 'success')
        },
        error: (err) => {
          console.log({ err })
          Swal.fire('', 'Error al registrar un certificado', 'error')
        }
      })
  }

  getAllCertificate() {
    this.isRegister = false
    this.isList = true
    this.isUpdate = false
    this.certificateService.getAllCertificates()
      .subscribe((response) => {
        this.listCertificate = response.map(item => {
          const fecha_emision = new Date(item.fecha_emision);
          const year = fecha_emision.getFullYear();
          const month = ('0' + (fecha_emision.getMonth() + 1)).slice(-2);
          const day = ('0' + fecha_emision.getDate()).slice(-2);
          item.fecha_emision = `${year}-${month}-${day}`;
          return item;
        });
      })

  }

  seeRegister() {
    this.isRegister = true
    this.isList = false
    this.isUpdate = false
  }

  updateCertificate(id: number) {
    this.isRegister = false
    this.isList = false
    this.isUpdate = true
    this.certificateService.getOneCertificate(id)
      .subscribe({
        next: (response) => {
          this.oneCertificate = response
          this.certificateUpdateForm.patchValue({
            id: response.id,
            titulo: response.titulo,
            descripcion: response.descripcion,
            fecha_emision: response.fecha_emision,
            CursoId: response.CursoId,
            UsuarioId: response.UsuarioId
          });
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  onUpdateCertificate() {
    const { id, titulo, descripcion, fecha_emision, CursoId, UsuarioId, } = this.certificateUpdateForm.value
    const user = localStorage.getItem('user')
    let usuarioIdLocal
    if (user) {
      usuarioIdLocal = JSON.parse(user)
    } else {
      console.log('error el user no existe en el localstorage')
    }

    const updateCertificate: UpdateCertificate = { titulo, descripcion, fecha_emision, UsuarioId: usuarioIdLocal.id, CursoId }
    console.log('update certificate')
    console.log({ id: +id, updateCertificate })
    this.certificateService.updateCertificate(id, updateCertificate)
      .subscribe({
        next: () => {
          Swal.fire('', 'Actualizado con exito', 'success')
        },
        error: (err) => {
          Swal.fire('', 'Error al actualizar', 'error')
          console.log({ err })
        }
      })
  }

  deleteOneCertificate(id: number) {
    this.certificateService.deleteCertificate(id)
      .subscribe({
        next: () => {
          this.listCertificate = this.listCertificate.filter(certi => certi.id !== id)
          Swal.fire('', 'Eliminado con exito', 'success')
        },
        error: (err) => {
          Swal.fire('', 'Error al eliminar', 'error')
          console.log({ err })
        }
      })

  }
}
