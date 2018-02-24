import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import swal from 'sweetalert2'
import { UploadService } from '../../services/upload/upload.service';
import { ModalUploadService } from './modal-upload.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  //	Propiedades de la clase ProfileComponent
  public imageUpload : File
  public imageTemp   : string

  constructor( private _uploadService : UploadService  ,
               private _modalUploadService : ModalUploadService,
               private _userService : UserService) {

  }

  ngOnInit() {

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
  // Proceso para actualizar imagen
  // ==========================================
  public uploadFile() {

    this._uploadService.uploadFile(
        this.imageUpload ,
        this._modalUploadService.collection ,
        this._modalUploadService.id ).then( (result : any) => {
          //	En caso la actualizacion sea del mismo usuario
          if( this._modalUploadService.collection == 'users' ) {
            console.log('users')
            if( this._modalUploadService.id == this._userService.user._id ) {
              this._userService.user.img = result.user.img
              this._userService.saveStorageUser( this._modalUploadService.id , this._userService.user , this._userService.token )
            }
          }
          console.log('pasooo por aquii')
          console.log( result )
          this._modalUploadService.notification.emit( result )
          this.closeModal()
        })
        .catch( err => console.error('Error en la carga' ,  err))
  }

  // ==========================================
  // Cerrar modal
  // ==========================================
  public closeModal() {
    this.imageTemp = ''
    this._modalUploadService.hideModal()
  }



}
