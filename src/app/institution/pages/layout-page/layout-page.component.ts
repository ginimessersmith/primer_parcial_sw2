import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateInstitutionInterface } from '../../interface/create-institution.interface';
import { InstitutionService } from '../../services/institution.service';
import Swal from 'sweetalert2'
import { Institution } from '../../interface/institution.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public registerInst: boolean = true
  public listInstitution: Institution[] = []
  public registerForm: FormGroup = this.FormBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)], []],
    direccion: ['', [Validators.required, Validators.minLength(2)], []],
    pais: ['', [Validators.required, Validators.minLength(2)], []],
    tipo: ['', [Validators.required, Validators.minLength(2)], []]
  })

  constructor(
    private router: Router,
    private FormBuilder: FormBuilder,
    private InstitutionService: InstitutionService
  ) { }
  ngOnInit(): void {
    const registerBoolLocal = localStorage.getItem('registerInst')
    // const listLocal = localStorage.getItem('listInstitution')
    if (registerBoolLocal) this.registerInst = JSON.parse(registerBoolLocal)
    // if (listLocal) this.listInstitution = JSON.parse(listLocal)
  this.viewAllInstitution()
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }

  registerInstitution() {

    const { nombre, direccion, pais, tipo } = this.registerForm.value
    const createInstitution: CreateInstitutionInterface = { nombre, direccion, pais, tipo }
    this.InstitutionService.registerInstitution(createInstitution)
      .subscribe({
        next: () => {
          Swal.fire('Registrado', 'Registrado con exito', 'success')
        },
        error: () => {
          Swal.fire('Error', 'Error al registrar', 'error')
        },
      })

  }

  viewAllInstitution() {
    this.registerInst = false
    localStorage.setItem('registerInst', JSON.stringify(this.registerInst))
    this.InstitutionService.viewAllInstitutions()
      .subscribe((response) => {
        this.listInstitution = response
        localStorage.setItem('listInstitution', JSON.stringify(this.listInstitution))
        console.log({ list: this.listInstitution })
      })

  }

  seeRegister() {
    this.registerInst = true
    localStorage.setItem('registerInst', JSON.stringify(this.registerInst))
  }



}
