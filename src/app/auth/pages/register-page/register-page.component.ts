import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CreateUserRequest } from '../../interfaces/create-user-request.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2'

interface Tipo {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  tipo: Tipo[] = [
    { value: 'Estudiante', viewValue: 'Estudiante' },
    { value: 'Docente', viewValue: 'Docente' },
    { value: 'Administrativo', viewValue: 'Administrativo' },
  ];
  private createUser: CreateUserRequest = {
    correo: '',
    nombre: '',
    password: '',
    tipo_usuario: ''
  };

  public registerForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)], []],
    correo: ['', [Validators.required, Validators.email, Validators.minLength(3)], []],
    password: ['', [Validators.required, Validators.minLength(6)], []],
    tipo_usuario: ['', [Validators.required], []],
  })
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }




  onRegister() {
    const { nombre, correo, password, tipo_usuario } = this.registerForm.value
    console.log(nombre)
    console.log(correo)
    console.log(password)
    console.log(tipo_usuario)
    this.createUser!.correo = correo
    this.createUser!.nombre = nombre
    this.createUser!.password = password
    this.createUser!.tipo_usuario = tipo_usuario

    this.authService.registerUser(this.createUser!).subscribe(
      (response) => {
        console.log('registerUser execute')
        // console.log({ response })
        // const user:User =response
        // localStorage.setItem('user',JSON.stringify(user))
        Swal.fire('', 'Registrado con Exito', 'success')
      },
      (error: HttpErrorResponse) => {
        console.log({ error: error.message })
        Swal.fire('Error de registro', 'El correo ya existe', 'error')
      }
    )
  }
}
