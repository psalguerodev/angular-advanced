import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  setting: Setting = {
    theme : "blue",
    themeUrl : "assets/css/colors/blue.css"
  }

  private stringSetting = 'settingAdm';

  constructor( @Inject(DOCUMENT) private _document ) {
    this.getStorageSetting();
   }

  storageSetting() {
    localStorage.setItem( this.stringSetting , JSON.stringify( this.setting ));
  }

  getStorageSetting() {
    if( localStorage.getItem(this.stringSetting )) {
      this.setting = JSON.parse( localStorage.getItem( this.stringSetting ) ) ;
      // console.log( 'Se ha encontrado theme : ' , this.setting );
      this.applySetting( this.setting.theme );
      return;
    }
    this.applySetting( this.setting.theme );
    // console.log( 'Default theme : ' , this.setting );
  }

  applySetting( theme: string ) {
    const pathCss = "assets/css/colors/"+ theme +".css";
    this._document.getElementById("theme").setAttribute('href' , pathCss );
    this.setting = { theme : theme , themeUrl : pathCss };
    this.storageSetting();
  }
}

interface Setting {
  themeUrl: string ,
  theme: string
}
