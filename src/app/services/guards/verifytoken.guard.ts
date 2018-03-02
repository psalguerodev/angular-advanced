import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class VerifytokenGuard implements CanActivate {

  constructor(
    private _userService : UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
      console.log( 'Verity Token' )
      let token = this._userService.token
      let payload = JSON.parse( window.atob(token.split(".")[1]) )

      let expired = this.tokenExpired( payload.ext )
      //	En caso el token esté expirado
      if( expired ) {
        this._userService.logoutUser()
        return false
      }


    return this.verifyToken( payload.exp );
  }


  verifyToken( dataExt : number ): Promise<boolean> {
    return new Promise( (resolve,reject) => {
      let tokenexpt = new Date( dataExt * 1000 )
      let now = new Date()

      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ) )

      if( tokenexpt.getTime() > now.getTime() ) {
        resolve( true )
      }

      //	Renovar token
      this._userService.renewToken().subscribe( (result:boolean) => {
        resolve( true )
      }, err => {
        this._userService.logoutUser()
        reject( false )
      })


    })
  }


  tokenExpired( dataExp : number ) {
    let now = new Date().getTime() / 1000

    if( dataExp < now ) {
      return true
    }

    return false
  }
}
