import { UploadService } from './../upload/upload.service'
import { Injectable } from '@angular/core'
import { User } from '../../models/user.model'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { URL_SERIVES } from '../../config/config'

import swal from 'sweetalert2'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UserService {

  public user : User = null
  public token : string = ''
  public menu : any  = {}

  constructor( private http: HttpClient , private _router : Router,
  private _uploadService : UploadService ) {
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
    .catch( err => {
      swal('Error en Registro' , err.error.errors.message , 'error')
      return Observable.throw(err)
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
      this.saveStorageUser( result.id , result.body , result.token , result.menu )
      //	Se guardo los datos en el LocalStorage
      return true
    }).catch( err => {
      swal('Error en Login' , err.error.message , 'error')
      return Observable.throw(err)
    })
  }

  // ==========================================
  // Login con Google SingIn
  // ==========================================
  public loginUserToGoogle ( token : string ) {
    let url = URL_SERIVES + "/login/google"
    return this.http.post( url , { token : token } ).map( ( result : any ) => {
      console.log( result )
      this.saveStorageUser( result.id , result.body , result.token  , result.menu )

      //	Se guardo los datos en el LocalStorage
      return true
    })
    .catch( err => {
      swal('Error en Login' , err.error.message , 'error')
      return Observable.throw(err)
    })
  }

  // ==========================================
  // Logout salir de la aplicacion limpiar vari
  // ==========================================
  public logoutUser() {
    this.user = null
    this.token = ''
    this.menu = []
    localStorage.removeItem( 'current_user_id' )
    localStorage.removeItem( 'current_user_token' )
    localStorage.removeItem( 'current_user' )
    localStorage.removeItem( 'current_user_menu' )
    this._router.navigate(["/login"])
  }

  // ==========================================
  // Guadar datos principales en LocalStorage
  // ==========================================
  public saveStorageUser( id : string , user : User , token : string , menu : any ) {
    localStorage.setItem( 'current_user_id' , id )
    localStorage.setItem( 'current_user_token' , token )
    localStorage.setItem( 'current_user' , JSON.stringify( user ) )
    localStorage.setItem( 'current_user_menu' , JSON.stringify( menu ))
    this.user = user
    this.token = token
    this.menu = menu
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
    this.menu  = ( JSON.parse(localStorage.getItem('current_user_menu'))) || null
  }

  // ==========================================
  // Actualizar perfil del usuario
  // ==========================================
  public updateUser( user : User ) {
    let url = URL_SERIVES +"/user/" + user._id + "?token=" + this.token

    return this.http.put( url , user ).map( (result : any ) => {
      if( this.user._id === user._id ) {
        this.saveStorageUser( result.user._id , result.user , this.token , result.menu )
      }
      swal("Fantástico","Actualizaste tus datos " + result.user.name ,"success")
      return true
    })
  }

  // ==========================================
  // Actualizar la foto del perfil de usuario
  // ==========================================
  public updatePictureProfile( file : File , id : string ) {
    this._uploadService.uploadFile( file , "users" , id )
        .then( (result : any) => {
          swal("Fantastico!", "Imagen de perfil actualizado correctamente", "success")
          this.user.img = result.user.img
          this.saveStorageUser( this.user._id , this.user , this.token , result.menu )
        })
        .catch( err => { console.log( err ) })
  }


  // ==========================================
  // Listar usuarios paginados
  // ==========================================
  public getListUsers( page: number = 0 ) {
    const url = URL_SERIVES + "/user?since=" + page
    return this.http.get( url )
  }

  // ==========================================
  // Buscar usuarios por termino
  // ==========================================
  public findUserByTerm( findText : string ) {
    const url = URL_SERIVES + "/seeker/collection/users/" + findText
    return this.http.get( url )
  }

  // ==========================================
  // Eliminar un usuario por ID
  // ==========================================
  public deleteUserById( user : User ) {
    const url = URL_SERIVES + "/user/" + user._id + "?token=" + this.token
    return this.http.delete( url )
  }

}
