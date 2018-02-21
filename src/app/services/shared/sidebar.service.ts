import { Injectable } from '@angular/core'

@Injectable()
export class SidebarService {

  public menu : any = [
  {
    title : 'Principal',
    icon  : 'mdi mdi-gauge',
    submenu : [
      {
        title : 'Dashboard',
        path  : '/dashboard'
      },
      {
        title : 'Barra de Progreso',
        path  : '/progress'
      },
      {
        title : 'Graficas',
        path  : '/graphone'
      },
      {
        title : 'Promesas',
        path  : '/promises'
      },
      {
        title : 'Observables Rxjs',
        path  : '/rxjs'
      },
    ]
  },
  {
    //Mantenimientos
    title : 'Mantenimientos',
    icon : 'mdi mdi-folder-lock-open',
    submenu : [
      {
        title : 'Usuarios',
        path : '/users'
      },
      {
        title : 'Hospitales',
        path: '/hospitals'
      },
      {
        title: 'Doctores',
        path : '/doctors'
      }
    ]
  }
]

  constructor() { }

}
