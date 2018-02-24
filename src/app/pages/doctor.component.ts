import { ModalUploadService } from './../components/upload/modal-upload.service';
import { Doctor } from './../models/doctor.model';
import { Hospital } from './../models/hospital.model';
import { HospitalService } from './../services/hospital/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../services/doctor/doctor.service';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit , OnDestroy {

  public _id : string = ''
  public hospitals : Hospital[] = []
  public hospital : Hospital = new Hospital('')
  public doctor : Doctor = new Doctor(null,null,null,null, '')


  constructor(
    private _hospitalS : HospitalService ,
    private _doctorS : DoctorService,
    private _router : Router ,
    private _activedRoute : ActivatedRoute ,
    private _moddalS : ModalUploadService
  ) { }

  ngOnInit() {
    this.inizialitionPage()
    this.getListHospitals()

    this._moddalS.notification.subscribe( (result:any) => {
      if( result.ok && result.doctor) {
        this.doctor.img = result.doctor.img

      }
    })

  }

  ngOnDestroy() {

  }

  // ==========================================
  // Obtener datos de los parametros
  // ==========================================
  public inizialitionPage() {
    this._activedRoute.params.subscribe( (params:any) => {
      if( params.id === 'nuevo' ) {
        this._id = null
        return
      }

      this._id = params.id
      this.getDoctorByIdPage()

    })
  }

  // ==========================================
  // Obtener el ID de la pagina
  // ==========================================
  public getDoctorByIdPage( ) {
    this._doctorS.getListDocById( this._id ).subscribe( (result:any) => {
      this.doctor = result.doctor
      this.hospital = result.doctor.hospital
    })
  }

  // ==========================================
  // Guardar un nuevo medico
  // ==========================================
  public saveDoc( form : NgForm ) {
    console.log( form.valid )
    console.log( form.value )
    this._doctorS.saveDoc( this.doctor ).subscribe( (result:any) => {
      this.doctor._id = result.doctor._id
      this._router.navigate(['/doctor', result.doctor._id ])
    })

  }

  // ==========================================
  // Listar los hospitales en el Select
  // ==========================================
  public getListHospitals() {
    this._hospitalS.getListHospital().subscribe( (result: any) => {
      this.hospitals = result.hospitals
    })
  }

  // ==========================================
  // Obtener el detalle del Hospital Seleccionado
  // ==========================================
  public hospitalSelect( idHospital : string  ) {

    if( idHospital == "" ) {
      this.hospital.name = ''
      this.hospital.img = ''
      this.hospital._id =''
      return;
    }

    this._hospitalS.getHospitalByID( idHospital ).subscribe( (result:any) => {
      this.hospital = result.hospital
    })

  }

  // ==========================================
  // Actualizar imagen del Doctor
  // ==========================================
  public showModalImage() {
    this._moddalS.showModal('doctors', this.doctor._id )
  }

}
