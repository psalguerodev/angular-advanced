import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  percent : number = 50;

  constructor() { }

  ngOnInit() {
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
  }



}
