import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  percent1 : number = 50;
  percent2 : number = 25;


  constructor() { }

  ngOnInit() {
  }

  changeProgress( event : number ) {
    // console.log( event );
  }


}
