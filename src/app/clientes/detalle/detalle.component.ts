import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Factura } from 'src/app/facturas/models/factura';
import { Cliente } from 'src/app/interfaces/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input()
  cliente: Cliente={
    id: 0,
    nombre: '',
    apellido: '',
    createAt:'',
    email: '',
    foto: '',
    region: {
      id: 0,
      nombre: ''
    },
    facturas: []
  }
  private imagen!: File;

  constructor(
    private clienteService: ClienteService,
    private routerActivate: ActivatedRoute,
    public modal: ModalServiceService,
    private facturaService: FacturaService
    ) { }

  ngOnInit(): void {
    /* this.routerActivate.paramMap
        .subscribe(
          params=>{
            let id: any=params.get('id');
            this.clienteService.getCliente(id)
                .subscribe(
                  cliente => {
                    this.cliente=cliente;
                  }
                )
          }
        ) */
  }

  selecionarFoto(event: any){

    this.imagen=event.target.files[0];
    if(this.imagen.type.indexOf('image')<0){

      swal.fire(
        'Error en subir imagen',
        'Debe seleccionar una imagen con formato .jpg, .png',
        'error'
      )
    }

    console.log(this.imagen)
  }

  subirFoto(){

    if(!this.imagen){

      swal.fire(
        'Error en subir imagen',
        'Debe seleccionar una imagen con formato .jpg, .png',
        'error'
      )
    }else{
    this.clienteService.subirFoto(this.imagen, this.cliente.id)
      .subscribe(
        response => {
          this.cliente=response;
          this.modal.notificarUpload.emit(this.cliente);
          swal.fire(
            'Foto subida correctamente',
            'La foto ha sido subida de manera exitosa',
            'success'
          )
        }
      )

    }
  }
  cerrarModal(){
    this.modal.cerrarModal();

  }

  eliminar(factura: Factura){
    swal
    .fire({
      title: 'Estas seguro que sea eliminar la factura?',
      text: 'Una vez eliminado no se podrá recuperar ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.facturaService.delete(factura.id).subscribe(
          ()=>  {
            this.cliente.facturas=this.cliente.facturas.filter(fac=> fac!==factura )
            swal.fire('Eliminado', 'Factura Eliminada', 'success')
          }
        )

      }
    });

  }

}
