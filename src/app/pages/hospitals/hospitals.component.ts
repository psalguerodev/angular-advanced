import { HospitalService } from '../../services/hospital/hospital.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/upload/modal-upload.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals : Hospital[] = []
  loading : boolean = true
  total : number = 0

  constructor(
    private _hospitalService : HospitalService,
    private _modalUploadService : ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHostpitals()

    this._modalUploadService.notification.subscribe( (resolve : any) => {
      if( resolve.ok ) this.loadHostpitals()
    })
  }

  // ==========================================
  // Cargar todos los hospitales sin paginar
  // ==========================================
  loadHostpitals() {
    this.loading = true
    this._hospitalService.getListHospital().subscribe( (result:any) => {
      this.hospitals = result.hospitals
      this.loading = false
      this.total = this.hospitals.length
    })
  }

  // ==========================================
  // Buscar Hospital por el nombre del Hospital
  // ==========================================
  findHospitalByName( findText : string , event ) {

    //	En caso el campo a buscar este vacio
    if( findText.length == 0  ) {
      this.loading = false
      this.loadHostpitals()
      return
    }

    //	En caso se presione escape cuando el texto sea mayor a 3 caracteres
    if( findText.length >= 3 && event.code.toLowerCase() == 'escape' ) {
      this.loading = false
      this.loadHostpitals()
      return
    }

    if( findText.length >= 3 ) {
      this.loading = true
      this._hospitalService.getListHospitalByName( findText.trim() )
          .subscribe( (result:any) => {
            this.loading = false
            this.hospitals = result.hospitals
          })
    }

  }

  // ==========================================
  // Crear un nuevo Hospital
  // ==========================================
  saveHospitalModal() {
    swal({
      title: 'Guardar nuevo hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: ( name ) => {

      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        let hospital = new Hospital( result.value , null , null , null )

        this._hospitalService.saveHospital( hospital ).subscribe( (saved:any) => {
          this.loadHostpitals()
          swal({
            type: 'success',
            title: 'Hospital Guardado',
            html: 'Nombre guardado: <strong>' + result.value + '</strong>'
          })
        })

      }
    })
  }

  // ==========================================
  // Eliminar un Hospital Seleccionado
  // ==========================================
  deleteHospitalById( hospital : Hospital ) {
    swal({
      title: '¿Está seguro de eliminar ? ',
      text: "Hospital: " + hospital.name ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar!'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.deleteHospitalById( hospital._id ).subscribe( ( deleted : any) => {
          console.log( deleted )
          swal(
            'Elimado!',
            'Se ha eliminado correctamente : ' + deleted.hospital.name ,
            'success'
          )

          this.loadHostpitals()
        })
      }
    })
  }

  // ==========================================
  // Actualizar Hospital por ID
  // ==========================================
  updateHospitalById( hospital : Hospital ) {
    this._hospitalService.updateHospital( hospital )
        .subscribe( (result:any) => { })
  }

  // ==========================================
  // Mostrar modal para actualizar fotos
  // ==========================================
  showModalForHospital( hospital : Hospital) {
    this._modalUploadService.showModal( 'hospitals' , hospital._id )
  }

}
