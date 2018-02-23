import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginGuardGuard ,
         SettingsService ,
         SidebarService,
         SharedService ,
         UserService ,
         UploadService,
         HospitalService,
         DoctorService
        } from './service.index'
import { HttpClientModule } from '@angular/common/http'
import { ModalUploadService } from '../components/upload/modal-upload.service';


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
    LoginGuardGuard,
    ModalUploadService,
    HospitalService,
    DoctorService
  ],
  declarations: []
})
export class SerivceModule { }
