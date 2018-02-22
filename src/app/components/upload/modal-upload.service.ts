import { Injectable , EventEmitter} from '@angular/core';

@Injectable()
export class ModalUploadService {

  public collection : string
  public id : string
  public none : string = 'none'
  public notification  = new EventEmitter<any>()

  constructor() {

  }

  // ==========================================
  // Ocultar el modal a travez de la clase none
  // ==========================================
  public hideModal( ) {
    this.none = 'none'
    this.collection = ''
    this.id = ''
  }

  // ==========================================
  // Mostrar el modal a traves de la clase none
  // ==========================================
  public showModal( collection : string , id : string ) {
    this.none = ''
    this.id = id
    this.collection = collection
  }

}
