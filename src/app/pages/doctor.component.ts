import { Doctor } from './../models/doctor.model';
import { Hospital } from './../models/hospital.model';
import { HospitalService } from './../services/hospital/hospital.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../services/doctor/doctor.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  public title : string = "Nuevo Doctor"
  public hospitals : Hospital[] = []
  public hospital : Hospital = new Hospital('')
  public doctor : Doctor = new Doctor(null,null,null,null, '')


  constructor(
    private _hospitalS : HospitalService ,
    private _doctorS : DoctorService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.getListHospitals()
  }

  // ==========================================
  // Guardar un nuevo medico
  // ==========================================
  saveDoc( form : NgForm ) {
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

}
