import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  author = 'Patrick Salguero Avalos';
  year  = new Date();
  constructor() { }

  ngOnInit() {
  }

}
