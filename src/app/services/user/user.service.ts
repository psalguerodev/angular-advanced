import { Injectable } from '@angular/core'
import { User } from '../../models/user.model'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { URL_SERIVES } from '../../config/config'

import 'rxjs/add/operator/map'

import swal from 'sweetalert2'

@Injectable()
export class UserService {

  public user : User = null
  public token : string = ''

  constructor( private http: HttpClient , private _router : Router ) {
    this.loadStorage()
  }

  // ==========================================
  // Registrar Usuario
  // ==========================================
  registerUser( user : User ) {
    let url = URL_SERIVES + "/user"
    return this.http.post( url , user ).map( ( result : any ) => {
      swal("Regitro correcto!","El correo <b>" + result.user.email + "</b> se ha registrado con éxito" ,"success")
      return result.user
    })
  }

  // ==========================================
  // Login normal email - password
  // ==========================================
  public loginUser( user : User , remember : boolean) {
    let url = URL_SERIVES + "/login"
    return this.http.post( url , user ).map( ( result : any ) => {

      if( remember ) {
        localStorage.setItem( 'current_email' , user.email )
      } else {
        localStorage.removeItem( 'current_email' )
      }

      this.saveStorageUser( result.id , result.body , result.token )

      //	Se guardo los datos en el LocalStorage
      return true
    })
  }

  // ==========================================
  // Login con Google SingIn
  // ==========================================
  public loginUserToGoogle ( token : string ) {
    let url = URL_SERIVES + "/login/google"
    return this.http.post( url , { token : token } ).map( ( result : any ) => {

      this.saveStorageUser( result.id , result.body , result.token )

      //	Se guardo los datos en el LocalStorage
      return true

    })
  }

  // ==========================================
  // Logout salir de la aplicacion limpiar vari
  // ==========================================
  public logoutUser() {
    this.user = null
    this.token = ''
    localStorage.removeItem( 'current_user_id' )
    localStorage.removeItem( 'current_user_token' )
    localStorage.removeItem( 'current_user' )
    this._router.navigate(["/login"])
  }

  // ==========================================
  // Guadar datos principales en LocalStorage
  // ==========================================
  private saveStorageUser( id : string , user : User , token : string ) {
    localStorage.setItem( 'current_user_id' , id )
    localStorage.setItem( 'current_user_token' , token )
    localStorage.setItem( 'current_user' , JSON.stringify( user ) )
    this.user = user
    this.token = token
  }

  // ==========================================
  // Validar si el usuario está logueado
  // ==========================================
  public isLogued() {
    return ( this.token.length > 1 && this.user != null ) ? true : false
  }

  // ==========================================
  // Cargar datos del storage - inicializar
  // ==========================================
  public loadStorage () {
    this.token = ( localStorage.getItem('current_user_token') ) || ''
    this.user  = ( JSON.parse(localStorage.getItem('current_user'))) || null
  }

}
