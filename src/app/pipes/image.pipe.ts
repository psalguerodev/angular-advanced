import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERIVES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img : string , collection : string = 'users'): any {
    let url = URL_SERIVES + "/image/"
    //	Obtener la imagen por defecto en caso no tenga imagen asociada
    if( !img ) {
      return url + "users/default"
    }

    //	En caso que la imagen sea de google
    if( img.indexOf("https") !=  -1 ) {
      return img
    }

    //	En caso la image tenga alguna path absoluta en el servidor
    return url + collection + "/" + img.trim()

  }

}
