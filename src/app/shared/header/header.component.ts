import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/service.index'
import { User } from '../../models/user.model'
import { Router } from '@angular/router'

declare var $

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user : User

  constructor(
    private _userService : UserService,
    private _router : Router
   ) { }

  ngOnInit() {
    this.user = this._userService.user
  }

  // ==========================================
  // Salir del Sistema
  // ==========================================
  logoutUser() {
    this._userService.logoutUser()
  }

  // ==========================================
  // Navegar al buscador de collecciones
  // ==========================================
  showFinder( find : string ) {
    if( find.length <= 3) return
    this._router.navigate(['/finder' , find.trim() ])
    $("#inputfindAll").val("")
    $(".app-search").toggle(200)
  }

  // ==========================================
  // Cerrar input con el escape
  // ==========================================
  closeInput() {
    $(".app-search").toggle(200)
  }
}
