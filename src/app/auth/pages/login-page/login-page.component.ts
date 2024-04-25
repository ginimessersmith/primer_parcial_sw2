import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
import { User } from '../../interfaces/user.interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  public loginForm: FormGroup = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email], []],
    password: ['', [Validators.required, Validators.minLength(6)], []]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) { }

  onLogin() {
    const { correo, password } = this.loginForm.value
    const LoginRequest: LoginRequest = {
      correo,
      password
    }

    this.authService.login(LoginRequest)
      .subscribe({
        next:(response)=>{
          console.log('next execute')
          const user:User = response
          localStorage.setItem('user',JSON.stringify(user))
          Swal.fire('','','success')
          this.router.navigateByUrl('user')
        },
        error:(err)=>{
          console.log('error execute')
          console.log({message:err.message})
        }
      })

  }
}
