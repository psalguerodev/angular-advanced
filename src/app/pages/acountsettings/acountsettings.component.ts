import { SettingsService } from './../../services/service.index';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-acountsettings',
  templateUrl: './acountsettings.component.html',
  styles: []
})
export class AcountsettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document , 
              private _settingService : SettingsService ) { }

  ngOnInit() {
    this.checkedtheme();
  }

  public changeThemeApp( theme :string , element : any ) {
    this.applyCheck( element );
    this._settingService.applySetting( theme );
  }

  private applyCheck( link : any ){
    let selectors : any = document.getElementsByClassName('selector');

    for ( let ref of selectors )ref.classList.remove('working');

    link.classList.add('working');
  }

  private checkedtheme(){
    let selectors : any = document.getElementsByClassName('selector');
    let theme = this._settingService.setting.theme;
    for ( let ref of selectors ){
      if( theme == ref.getAttribute('data-theme') ){
        ref.classList.add('working');break;
      }
    }
  }
}
