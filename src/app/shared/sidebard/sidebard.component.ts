import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: []
})
export class SidebardComponent implements OnInit {

  user : User

  constructor(
    public _sideBarService : SidebarService ,
    private _userService : UserService
  ) { }

  ngOnInit() {
    this.user = this._userService.user
  }

  logoutUser() {
    this._userService.logoutUser()
  }

}
