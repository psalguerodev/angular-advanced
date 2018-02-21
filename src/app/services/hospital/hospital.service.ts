import { Hospital } from '../../models/hospital.model';
import { URL_SERIVES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable()
export class HospitalService {

  constructor(
     private _http : HttpClient ,
     private _userService : UserService
              ) { }

  // ==========================================
  // Listar todos los hospitales sin paginacion
  // ==========================================
  public getListHospital() {
    const url = URL_SERIVES + "/hospital"
    return this._http.get( url )
  }

  // ==========================================
  // Obtener Hospital por ID
  // ==========================================
  public getHospitalByID( id : string ) {
    const url = URL_SERIVES + "/hospital/" + id + "?token=" + this._userService.token
    return this._http.get( url ) 
  }
    
  // ==========================================
  // Guardar un nuevo hospital
  // ==========================================
  public saveHospital ( hospital : Hospital ) {
    const url = URL_SERIVES + "/hospital?token=" + this._userService.token
    return this._http.post( url , hospital )
  }
  
  // ==========================================
  // Actualizar un hospital por el ID
  // ==========================================
  public updateHospital( hospital: Hospital ) {
    const url = URL_SERIVES + "/hospital/" + hospital._id + "?token=" + this._userService.token
    return this._http.put( url , hospital )
  }

  // ==========================================
  // Eliminar un hospital por el ID
  // ==========================================
  public deleteHospitalById( id : string ) {
    const url = URL_SERIVES + "/hospital/" + id + "?token=" + this._userService.token
    return this._http.delete( url )
  }

}
