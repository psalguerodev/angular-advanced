import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  author = 'Patrick Salguero Avalos';
  year  = new Date();
  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
