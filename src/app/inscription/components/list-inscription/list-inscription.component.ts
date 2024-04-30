import { Component, OnInit } from '@angular/core';

import { InscriptionService } from '../../services/inscription.service';
import { UserService } from '../../../user/services/user.service';
import { CourseService } from '../../../course/services/course.service';
import { Course } from 'src/app/course/interface/course.interface';
import { Inscription } from '../../interface/inscription.interface';

import swal from 'sweetalert2';

@Component({
  selector: 'list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.css']
})
export class ListInscriptionComponent implements OnInit {

  public listInscriptions: Inscription[] = []


  constructor(
    private inscriptionService: InscriptionService,
  ) { }

  ngOnInit(): void {
    this.inscriptionService.getAll()
      .subscribe({
        next: (response) => {
          this.listInscriptions = response
          console.log({ list: this.listInscriptions })
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  onDelete(UsuarioId: number, CursoId: number) {
    this.inscriptionService.delete(UsuarioId, CursoId)
      .subscribe({
        next: () => {
          const index = this.listInscriptions.findIndex(insc => insc.curso.id === CursoId && insc.usuario.id === UsuarioId);
          if (index !== -1) {
            this.listInscriptions.splice(index, 1);
            swal.fire('', '', 'success');
          }
        },
        error: (err) => {
          swal.fire('', 'Error la eliminar', 'error')
          console.log({ err })
        }
      })
  }

}
