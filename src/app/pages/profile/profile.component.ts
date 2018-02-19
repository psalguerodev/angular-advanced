import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

import swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  //	Propiedades de la clase ProfileComponent
  public user : User
  public imageUpload : File
  public imageTemp   : string


  constructor( private _userService : UserService ) { }

  ngOnInit() {
    this.user = this._userService.user
  }

  // ==========================================
  // Actualizar los datos del usuario del formulario
  // ==========================================
  updateUser( user : User ) {
    this.user.name = user.name
    if( !this.user.goggle ) {
      this.user.email = user.email
    }

    this._userService.updateUser( this.user ).subscribe( result => {
     //	Se ha realizado la actualizacion del perfil
    })
  }

  // ==========================================
  // Controlar el cambio y vista previa de la imagen
  // ==========================================
  changeFileUpload( file : File ) {
    //	En caso no seleccione ninguna imagen
    if( !file ) {
      this.imageUpload = null
      this.imageTemp = null
      return
    }

    //	Validar que solo se seleccione imagenes
    if( file.type.indexOf( 'image' ) < 0 ) {
      this.imageUpload = null
      this.imageTemp = null
      swal( 'Solo imagenes' , 'Por favor solo seleccione imagenes.' , 'error')
      return
    }

    this.imageUpload = file

    //	Leer y mostrar la vista previa  de la imagen seleccionada
    let filereader = new FileReader()
    let temporal = filereader.readAsDataURL( this.imageUpload )
    filereader.onloadend = () => this.imageTemp = filereader.result

  }


  // ==========================================
  // Invocar el metodo del servicio para actualizar imagen
  // ==========================================
  uplodadImageProfile() {
    this._userService.updatePictureProfile( this.imageUpload , this.user._id )
  }

}
