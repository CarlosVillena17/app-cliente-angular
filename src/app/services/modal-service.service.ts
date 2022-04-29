import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  modal: boolean = false;

  notificarUpload=new EventEmitter<any>();
  constructor() { }

  abrirModal(){
    this.modal=true;
  }

  cerrarModal(){
    this.modal=false;
  }
}
