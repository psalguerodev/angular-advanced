import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.promesaFn().then(( result ) => {
      console.info( 'Terminó proceso !' , result );
    }).catch( error => console.error( 'Error en el Proceso ' , error ) );

  }

  ngOnInit() {
  }


  promesaFn():Promise<boolean> {
    return new Promise( (resolve , reject ) => {
      let cont = 0;

      let interval =setInterval(( ) => {
        cont++;
        console.log( cont );
        if( cont == 3  ) {
          clearInterval( interval );
          resolve( true );
        }
      } , 1000 );

    });
  }

}
