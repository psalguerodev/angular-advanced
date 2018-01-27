import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphdoughnut',
  templateUrl: './graphdoughnut.component.html',
  styles: []
})
export class GraphdoughnutComponent implements OnInit {

  @Input() dataChart : any[]  = [];
  @Input() labelsChart : any [] = [];
  @Input() typeChart : string  = "doughnut";
  @Input() leyend : string = "Leyenda";

  constructor() { }

  ngOnInit() {
  }

}
