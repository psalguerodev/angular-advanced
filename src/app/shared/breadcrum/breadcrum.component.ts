import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Meta , MetaDefinition } from '@angular/platform-browser';
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styles: []
})
export class BreadcrumComponent {

  public titleBreadcrum : string = "";

  constructor( private _router : Router,
               private _title : Title ,
               private _meta : Meta) {

    this.getDataRoute()
    .subscribe( data => {
      // console.log( data.title );
      this.titleBreadcrum = data.title;
      this._title.setTitle( 'Adm Pro |' + (this.titleBreadcrum || 'Angular Pro') );
      let metaTag  : MetaDefinition = {
        name: 'description',
        content: this.titleBreadcrum
      };
      this._meta.updateTag( metaTag );

    });

  }

  getDataRoute() {
    return this._router.events
      .filter( event => ( event instanceof ActivationEnd ) )
      .filter( (event: ActivationEnd) => ( event.snapshot.firstChild === null ) )
      .map( (event: ActivationEnd) => event.snapshot.data );
  }

}
