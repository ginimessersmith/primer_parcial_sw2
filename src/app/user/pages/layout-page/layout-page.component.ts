import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { OneUserGet } from '../../interfaces/one-user.interface';
import { AsistantResponse } from '../../interfaces/assitant-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public errorPerfil: boolean = false
  public assitantEnable: boolean = true
  public userLocal!: User
  public user!: OneUserGet
  public idAssistant: String = ''
  public listAssistant: AsistantResponse[] = []

  public inputMessage: FormGroup = this.FormBuilder.group({
    message: ['', [Validators.required, Validators.minLength(1)], []]
  })

  constructor(
    private router: Router,
    private userService: UserService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const userLocalStorage = localStorage.getItem('user')
    // this.setAssitantEnable()
    // let user: User
    const assitantBool = localStorage.getItem('assitantEnable')
    const listAssistanLocal = localStorage.getItem('listAssistan')
    if (assitantBool) {
      this.assitantEnable = JSON.parse(assitantBool)
    }
    if (listAssistanLocal) {
      this.listAssistant = JSON.parse(listAssistanLocal)
    }
    if (userLocalStorage) {
      this.userLocal = JSON.parse(userLocalStorage)
      this.getOneUser(this.userLocal.id)
    } else {

      this.errorPerfil = true

    }
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }

  getOneUser(id: number) {
    this.userService.getOneUser(id)
      .subscribe({
        next: (response) => {
          console.log('perfil user')
          console.log({ response })
          this.user = response
        },
        error: () => { }
      })
  }

  newAssistant() {
    this.setAssitantEnable()  
    this.userService.newAssistant()
      .subscribe({
        next: (response) => {
          this.idAssistant = response
          localStorage.setItem('idAssistant', JSON.stringify(this.idAssistant))
        },
        error: () => { }
      })
  }

  sendQuestion() {
    let idLocal = localStorage.getItem('idAssistant')
    const question = this.inputMessage.controls['message'].value
    this.inputMessage.patchValue({ message: '' })
    if (!idLocal) {
      console.log('el id no existe')
    } else {
      const id = JSON.parse(idLocal)
      this.userService.sendMessage(question, id)
        .subscribe(
          (response) => {
            this.listAssistant = response
            localStorage.setItem('listAssistan', JSON.stringify(this.listAssistant))
            console.log({ response })
          }
        )
    }
  }

  deleteChat() {
    localStorage.removeItem('listAssistan')
    this.listAssistant=[]
    this.setAssitantEnable()
    localStorage.removeItem('idAssistant')
  }

  private setAssitantEnable() {
    const assitantBool = localStorage.getItem('assitantEnable')
    if (assitantBool) {
      this.assitantEnable = !JSON.parse(assitantBool)
      localStorage.setItem('assitantEnable', JSON.stringify(this.assitantEnable))
    } else {
      this.assitantEnable = !this.assitantEnable
      localStorage.setItem('assitantEnable', JSON.stringify(this.assitantEnable))
    }
  }

}
