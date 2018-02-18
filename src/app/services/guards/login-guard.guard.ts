import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { UserService } from '../user/user.service'


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
      private _userS : UserService ,
      private _router : Router
  ) {}

  canActivate(): boolean {
    if( this._userS.isLogued() ) {
      console.log( 'Acceso concedido!!' )
      return true
    }
    console.error( '>> Acceso denegado <<' )
    this._router.navigate(["/login"])
    return false
  }
}
