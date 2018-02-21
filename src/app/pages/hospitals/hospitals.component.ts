import { HospitalService } from '../../services/hospital/hospital.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals : Hospital[] = []
  loading : boolean = true

  constructor( 
    private _hospitalService : HospitalService
  ) { }

  ngOnInit() {
    this.loadHostpitals()
  }


  loadHostpitals() {
    this.loading = true
    this._hospitalService.getListHospital().subscribe( (result:any) => {
      this.hospitals = result
      this.loading = false
      console.log( result )
    })
  }

}
