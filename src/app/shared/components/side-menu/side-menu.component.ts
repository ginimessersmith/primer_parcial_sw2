import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  route: string
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menu: MenuItem[] = [
    {title:'Perfil',route:'/user'},
    {title:'Cursos',route:'/course'},
    {title:'Certificados',route:'/certificate'},
    // {title:'Inscripciones',route:'/inscription'},
    {title:'Institucion',route:'/institution'},
  ]
}
