import { URL_SERIVES } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operator/map';
import { Doctor } from '../../models/doctor.model';
import { UserService } from '../user/user.service';
import swal from 'sweetalert2'

@Injectable()
export class DoctorService {

  public total : number  = 0

  constructor(
    private _http: HttpClient ,
    private _userS : UserService
  ) { }

  // ==========================================
  // Listar todos los medicos
  // ==========================================
  public getListDoctors() {
    const url = URL_SERIVES + "/doctor/"
    return this._http.get( url ).map( ( result : any) => {
      this.total = result.total
      return result
    })
  }

  // ==========================================
  // Obtener un medico por ID
  // ==========================================
  public getListDocById( _id : string ) {
    const url = URL_SERIVES + "/doctor/" + _id
    return this._http.get( url )
  }

  // ==========================================
  // Actualizar Doctor por ID
  // ==========================================
  public updateDocById( doctor : Doctor ) {
    const url = URL_SERIVES + "/doctor/" + doctor._id + "?token=" + this._userS.token
    return this._http.put( url , doctor )
  }

  // ==========================================
  // Guardar un nuevo Doctor
  // ==========================================
  public saveDoc( doctor : Doctor ) {
    const url = URL_SERIVES + "/doctor" + "?token=" + this._userS.token
    return this._http.post( url , doctor ).map( (result:any) => {
      swal('Fantástico' , 'Se ha agregado al doctor ' + doctor.name + " !" , 'success')
      return result
    })
  }

  // ==========================================
  // Eliminar Doctor por ID
  // ==========================================
  public deleteDocById( identity : string ) {
    const url = URL_SERIVES + "/doctor/" + identity + "?token=" + this._userS.token
    return this._http.delete( url )
  }

  // ==========================================
  // Buscar Doctor por palabra a buscar
  // ==========================================
  public findDocByName( name : string ) {
    const url = URL_SERIVES + "/seeker/collection/doctors/" + name.trim()
    return this._http.get( url )
  }

}
