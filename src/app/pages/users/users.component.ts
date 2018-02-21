import { ModalUploadService } from './../../components/upload/modal-upload.service';
import { UserService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users : User[] = []
  since : number = 0
  total : number = 0
  loading : boolean = true
  totalFind : number = 0

  constructor( private _userService : UserService ,
  private _modalUploadService : ModalUploadService ) { }

  ngOnInit() {
    this.loadUsers()
    this._modalUploadService.notification.subscribe( (result : any) => {
      if( result.ok == true ) {
        this.loadUsers()
      }
    })
  }

  // ==========================================
  // Cargar usuarios desde el servicio
  // ==========================================
  loadUsers() {
    this.loading = true
    this._userService.getListUsers( this.since ).subscribe( (result : any) => {
      this.users = result.users
      this.total = result.total
      this.loading = false
    })
  }

  // ==========================================
  // Paginador de los usuarios
  // ==========================================
  changeSince( value : number ) {
    let since = this.since + value

    //	En caso se desea ir mas que el total
    if( since >= this.total ) {
      return
    }

    //	En caso se desea ir menos que el cero
    if( since < 0 ) {
      return
    }

    this.since += value

    this.loadUsers()

  }

  // ==========================================
  // Buscar usuario por nombre
  // ==========================================
  findToNameUser( findText : string ) {

    //	En caso que no alcance el minimo de caracteres
    if( findText.length == 0 ) {
      this.totalFind = 0
      this.loadUsers()
      return
    }

    //	En caso existan >= 3 letras recien buscará
    if( findText.length >= 3 ) {
      this.loading = true
      this._userService.findUserByTerm( findText.trim() ).subscribe( ( data : any ) => {
        if( data.users.length > 0 ) {
          this.users = []
          this.users = data.users
          this.totalFind = data.users.length
          this.loading = false
        }
      })
    }
  }

  // ==========================================
  // Eliminar un usuario por ID
  // ==========================================
  deleteUser( user : User ) {

    //	En caso el usuario a eliminar sea el mismo que está logueado
    if( user._id === this._userService.user._id ) {
      swal('Operación incorrecta', 'El usuario que desea eliminar pertenece al de ud. ' + user.name , 'error')
      return
    }

    //	En caso el usuario sea distinto al login y acepte la confirmación
    swal({
      title: '¿Está seguro de eliminar ? ',
      text: "Usuario: " + user.name ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar!'
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUserById( user ).subscribe( ( deleted : any) => {
          swal(
            'Elimado!',
            'Se ha eliminado correctamente : ' + deleted.user.name ,
            'success'
          )
          if( this.since >= 5 )
            this.since += -5
          this.loadUsers()
        })
      }
    })

  }

  // ==========================================
  // Actualizar el role del usuario
  // ==========================================
  updateUser( user : User ) {
    this._userService.updateUser( user ).subscribe( result => { })
  }

  // ==========================================
  // Mostrar modal y llenar datos del Servicio Modal
  // ==========================================
  showModal( user : User ) {
    this._modalUploadService.showModal('users', user._id )
    this._modalUploadService.id = user._id
    this._modalUploadService.collection = 'users'
  }

}
