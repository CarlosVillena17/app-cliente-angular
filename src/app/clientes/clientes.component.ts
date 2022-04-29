import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/clientes';
import { ClienteService } from '../services/cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { formatDate } from '@angular/common';
import { ModalServiceService } from '../services/modal-service.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  paginator: any;
  clienteSeleccionado: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    createAt: '',
    email: '',
    foto: '',
    region: {
      id: 0,
      nombre: ''
    },
    facturas: []
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: ModalServiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: any = params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response) => {
            let clientes = response.content as Cliente[];
            clientes.forEach((cliente) => {
              console.log(cliente.nombre);
              this.paginator = response;
              console.log(this.paginator);
            });
          }),
          map((response) => {
            let clientes = response.content as Cliente[];
            return clientes.map((cliente) => {
              cliente.nombre = cliente.nombre.toUpperCase();
              cliente.createAt = formatDate(
                cliente.createAt,
                'dd-MM-yyyy',
                'en-US'
              );
              return cliente;
            });
          })
        )
        .subscribe((clientes) => {
          this.clientes = clientes;
        });
    });

    this.modal.notificarUpload.subscribe(cliente=> {
      this.clientes= this.clientes.map( n =>{
        if(n.id==cliente.id){
          n.foto=cliente.foto;
        }
        return n;
      }

      )
    })
  }

  delete(cliente: Cliente) {
    swal
      .fire({
        title: 'Estas seguro que sea eliminar el cliente?',
        text: 'Una vez eliminado no se podrá recuperar ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter((cli) => cli !== cliente);
            swal.fire('Eliminado', 'Cliente eliminado', 'success');
          });
        }
      });
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado=cliente;
    this.modal.abrirModal();
  }

}
