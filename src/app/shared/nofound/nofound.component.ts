import { Component, OnInit } from '@angular/core';

declare function init_plugins()

@Component({
  selector: 'app-nofound',
  templateUrl: './nofound.component.html',
  styles: []
})
export class NofoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins()
  }

}
