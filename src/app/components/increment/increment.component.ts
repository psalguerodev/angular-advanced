import { Component, OnInit, Input , Output, EventEmitter , ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {
  @Input("percent") percent : number = 50;
  @Input("leyend") leyend  : string = "Leyenda";
  @Output() changepercent : EventEmitter<number> = new EventEmitter();
  @ViewChild("percentHtml") percentHtml : ElementRef;


  constructor() {
    console.log( this.percent );
    console.log( this.leyend );
  }

  ngOnInit() {
    console.log( this.percent );
    console.log( this.leyend );
  }

  processValue(value :number ){
    if( this.percent >= 100 && value > 0 ){
      this.percent = 100;
      return;
    }
    if( this.percent <= 0  ){
      this.percent = 0;
    }

    this.percent += value;

    this.changepercent.emit( this.percent );
  }

  onChanges( event : number ){
   
    if( event >= 100 ) {
      this.percent = 100; 
    }
    else if ( event <= 0) {
      this.percent = 0;
    } else{
      this.percent = event;
    } 

    this.percentHtml.nativeElement.value = this.percent;

    console.log( event );
    this.changepercent.emit(  this.percent );

    this.percentHtml.nativeElement.focus();
  }


}
