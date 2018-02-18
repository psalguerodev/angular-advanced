import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins()
declare const gapi : any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email : string
  public remember : boolean = false
  public auth2 : any

  constructor(
     private _router : Router ,
     private _userS : UserService
  ) { }

  ngOnInit() {
    init_plugins()
    this.email = localStorage.getItem( 'current_email' ) || ''
    this.remember = (this.email != '' ) || false
    if( this.email.length == 0 ) {
      document.getElementsByName('email')[0].focus()
    } else {
      document.getElementsByName('password')[0].focus()
    }

    this.googleInit()
  }

  // ==========================================
  // Google init
  // ==========================================
  googleInit() {
    gapi.load( 'auth2' , () => {
      this.auth2 = gapi.auth2.init({
        client_id : '621727429813-1v0nidi7859hc6fj84ntub7j8qefeh4p.apps.googleusercontent.com',
        cookiepolicy : 'single_host_origin' ,
        scope : 'profile email'
      })

      //	Agregar el attach al boton de google
      this.attachSignIn( document.getElementById( 'btnGoogle' ) )

    })
  }


  // ==========================================
  // Atrapar cuando se da click en btnGoogle
  // ==========================================
  attachSignIn( element ) {
    this.auth2.attachClickHandler( element , {} , ( googleuser ) => {
      const profile = googleuser.getBasicProfile()
      const token   = googleuser.getAuthResponse().id_token

      if( token.length > 1 ) {
        this._userS.loginUserToGoogle( token )
            .subscribe( result => window.location.href = '#/dashboard' )
      }

    })
  }

  // ==========================================
  // Login de acceso normal email - password
  // ==========================================
  public loginProcess( form : NgForm) {
    if( !form.valid ) return; //	En caso del formulario incorrecto

    let user = new User( null , form.value.email , form.value.password )

    this._userS.loginUser( user , form.value.remember )
        .subscribe( result => this._router.navigate( ['/dashboard'] ) )
  }

}
