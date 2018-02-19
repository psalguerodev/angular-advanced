import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginGuardGuard ,
         SettingsService ,
         SidebarService,
         SharedService ,
         UserService ,
         UploadService
        } from './service.index'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService ,
    SidebarService,
    SharedService,
    UserService,
    UploadService,
    LoginGuardGuard
  ],
  declarations: []
})
export class SerivceModule { }
