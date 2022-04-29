import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../interfaces/clientes';
import { ClienteService } from '../services/cliente.service';
import swal from 'sweetalert2'
import { Region } from '../interfaces/region';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente={
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    createAt: '',
    foto: '',
    region: {
      id: 0,
      nombre: ''
    },
    facturas: []
  };

  public errores: string[] = [];
  public regiones: Region[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.cargarRegiones();
  }
  public create(): void{
      this.clienteService.create(this.cliente).subscribe(
        (response) =>{
          swal.fire('Nuevo cliente',
          `Cliente ${response.nombre} creado con exito`,
          'success')
          this.router.navigate(['/clientes'])
        },
        err => {
          this.errores=err.error
          console.error(err.error)
          console.error(err.status)
        }
      );
  }

  public cargarCliente(): void{
   this.activateRouter.params.subscribe(
      (params) => {
        let id=params['id'];
        if(id){
          this.clienteService.getCliente(id)
            .subscribe(
              (cliente) => {
                this.cliente=cliente;
              }
            )
        }
      }
   )
  }



  public update(): void{
    this.clienteService.update(this.cliente)
      .subscribe((response) => {
        console.log(response)
        swal.fire('Cliente actualizado',
          `Cliente ${response.nombre} ha sido actualizado con exito`,
          'success')
          this.router.navigate(['/clientes'])
        this.router.navigate(['/clientes'])
      },
      err => {
        this.errores=err.error.errores as string[]
        console.error(err.error.errores)
        console.error(err.status)
      })
  }

  public cargarRegiones(): void{
     this.clienteService.getRegiones()
      .subscribe(
        regiones=> {
          this.regiones=regiones;
        }
      )
  }
  compararRegion(o1: Region, o2: Region){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1=== null || o2===null  || o1=== undefined || o2=== undefined ? false: o1.id===o2.id
  }
}
