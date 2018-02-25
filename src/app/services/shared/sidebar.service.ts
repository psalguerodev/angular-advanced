import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { URL_SERIVES } from '../../config/config';
import { UserService } from '../user/user.service';

@Injectable()
export class SidebarService {

//   public menu : any = [
//   {
//     title : 'Principal',
//     icon  : 'mdi mdi-gauge',
//     submenu : [
//       {
//         title : 'Dashboard',
//         path  : '/dashboard'
//       },
//       {
//         title : 'Barra de Progreso',
//         path  : '/progress'
//       },
//       {
//         title : 'Graficas',
//         path  : '/graphone'
//       },
//       {
//         title : 'Promesas',
//         path  : '/promises'
//       },
//       {
//         title : 'Observables Rxjs',
//         path  : '/rxjs'
//       },
//     ]
//   },
//   {
//     //Mantenimientos
//     title : 'Mantenimientos',
//     icon : 'mdi mdi-folder-lock-open',
//     submenu : [
//       {
//         title : 'Usuarios',
//         path : '/users'
//       },
//       {
//         title : 'Hospitales',
//         path: '/hospitals'
//       },
//       {
//         title: 'Doctores',
//         path : '/doctors'
//       }
//     ]
//   }
// ]

  public menu : any [] = []

  constructor( private userService : UserService ) {

  }

  loadMenu () {
    this.menu = this.userService.menu
  }


}
