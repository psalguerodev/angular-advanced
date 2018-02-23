import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';
import swal from 'sweetalert2'


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  //	Propiedades de la clase binding
  public doctors : Doctor[] = []
  public loading : boolean = true

  constructor(
    public _doctorService : DoctorService
  ) { }

  ngOnInit() {
    this.loadDoctors()
  }

  // ==========================================
  // Cargar los doctores
  // ==========================================
  public loadDoctors() {
    this.loading = true
    this._doctorService.getListDoctors().subscribe( (result : any ) => {
      this.loading = false
      this.doctors = result.doctors
    })
  }

  // ==========================================
  // Eliminar el Doctor seleccionado por ID
  // ==========================================
  public deleteDoct( doctor : Doctor ) {
    swal({
      title: '¿Está seguro de eliminar ? ',
      text: "Doctor: " + doctor.name ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar!'
    }).then((result) => {
      if (result.value) {
        this._doctorService.deleteDocById( doctor._id ).subscribe( ( deleted : any) => {
          console.log( deleted )
          swal(
            'Elimado!',
            'Se ha eliminado correctamente : ' + deleted.doctor.name ,
            'success'
          )

          this.loadDoctors()
        })
      }
    })
  }

  // ==========================================
  // Buscar doctor por nombre
  // ==========================================
  public findDocByText( text : string , event ) {

    //	En caso el campo a buscar este vacio
    if( text.length == 0  ) {
      this.loading = false
      this.loadDoctors()
      return
    }

    //	En caso se presione escape cuando el texto sea mayor a 3 caracteres
    if( text.length >= 3 && event.code.toLowerCase() == 'escape' ) {
      this.loading = false
      this.loadDoctors()
      return
    }

    this._doctorService.findDocByName( text ).subscribe( (result : any ) => {
      this.doctors = result.doctors
    })
  }

}
