import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { UserService } from '../services/service.index'

import swal from 'sweetalert2'
import { User } from '../models/user.model'
import { Router } from '@angular/router'
declare function init_plugins()

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formgroup : FormGroup

  constructor(
    private _userS : UserService ,
    private _router : Router
  ) { }

  // ==========================================
  // Inicializar el componente
  // ==========================================
  ngOnInit() {
    init_plugins()
    // console.clear()
    this.formgroup = new FormGroup({
      name : new FormControl( null , Validators.required ),
      email : new FormControl( null , [ Validators.required , Validators.email ]),
      password : new FormControl( null, Validators.required ),
      password2 : new FormControl( null , Validators.required ),
      terms : new FormControl( false )
    } , { validators : this.isEqualsPassword('password' , 'password2') } )

    // this.formgroup.setValue({
    //   name : 'Patrick Salguero Avalos',
    //   email : 'patrick.salguero.avalos@gmail.com',
    //   password : 'softpatrick',
    //   password2 : 'softpatrick',
    //   terms : false
    // })
  }

  // ==========================================
  // Funcion OnSubmit para registrar usuario
  // ==========================================
  registerUser() {
    //	En caso que el formulario esté incorrecto
    if( this.formgroup.invalid ) {
      return
    }

    //	En caso no acepte las condiciones de uso
    if( !this.formgroup.value.terms ) {
      swal("Mensaje!", "Debes aceptar las condiciones!", "warning")
      return
    }

    let user_register = new User(
      this.formgroup.value.name,
      this.formgroup.value.email,
      this.formgroup.value.password
    )

    this._userS.registerUser( user_register )
        .subscribe( result => this._router.navigate( ['login'] ))

  }

  // ==========================================
  // Validador personaizado para password iguales
  // ==========================================
  isEqualsPassword( field1 : string , field2 : string ) {
    return ( group : FormGroup) => {
      let pass1 = group.controls[ field1 ].value
      let pass2 = group.controls[ field2 ].value

      if( pass1 === pass2 ) return null

      return {
        isEquals : true
      }
    }
  }


}
