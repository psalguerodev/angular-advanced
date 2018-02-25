import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERIVES } from '../../config/config';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styles: []
})
export class FinderComponent implements OnInit {

  findText : string = ''
  resultFind : any [] = []
  users : User[] = []
  doctors : Doctor[] = []
  hospitals : Hospital[] = []

  constructor(
    private activateRoute : ActivatedRoute,
    private http : HttpClient
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe( (p:any) => {
      this.findText = p['find']
      this.findCollections()
    })
  }

  findCollections() {
    if( this.findText.length <= 2 ) return
    let url = URL_SERIVES + "/seeker/all/" + this.findText
    this.http.get( url ).subscribe( (result:any) => {
      this.resultFind = result
      this.users = result.users
      this.hospitals  = result.hospitals
      this.doctors = result.doctors

    })
  }

}
