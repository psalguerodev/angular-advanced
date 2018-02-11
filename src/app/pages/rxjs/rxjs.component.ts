import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit , OnDestroy {

  public subscription : Subscription;

  constructor() {

    this.subscription = this.fn_returnObs().retry(2)
      .subscribe( cont => {
      console.info( cont );
    },
    err => console.error('Ha sucedido un error!' , err.message ) ,
    () => console.info('Se ha terminado correctamente'));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Se va a cerrar');
    this.subscription.unsubscribe();
  }

  public fn_returnObs() : Observable<number> {
    return new Observable( observer => {
      let cont = 0;
      let interval = setInterval( () => {
        cont++;
        observer.next( cont );

        if( cont === 3 ) {
          clearInterval( interval );
          observer.complete();
        }

        if( cont == 2 ) {
          // clearInterval( interval );
          observer.error( {message:'Sucedio un error xq es 2.'});
        }

      }, 1000);
    });
  }

}
