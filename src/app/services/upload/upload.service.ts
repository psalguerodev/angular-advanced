import { URL_SERIVES } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

  constructor() { }

  // ==========================================
  // Metodo para subir archivo en las collecciones
  // ==========================================
  uploadFile ( file : File , collection : string , id : string ) {
    return new Promise( (resolve, reject) => {
      let formdata  = new FormData()
      let xhr  = new XMLHttpRequest()
      let url = URL_SERIVES + "/upload/" + collection + "/" + id

      formdata.append( "image" , file , file.name )

      //	Controlando el cambio de estado
      xhr.onreadystatechange  = function () {
        if( xhr.readyState === 4 ) {
            if( xhr.status === 200 ) {
              // console.log( "Imagen subida correctamente" )
              resolve( JSON.parse( xhr.response) )
            } else {
              // console.log( 'Error en cargar imagen' )
              reject( JSON.parse( xhr.response ) )
            }
          }
      }

      //	Enviando la peticion
      xhr.open( "PUT" , url , true )
      xhr.send( formdata )

    })

  }

}
