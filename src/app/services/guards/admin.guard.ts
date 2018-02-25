import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private userService : UserService
  ) {

  }

  canActivate() {
    if( this.userService.user.role == 'ADMIN_ROLE' ) {
      return true;
    }

    this.userService.logoutUser()
    console.info('bloqueado por admin guard')
    return false

  }
}
