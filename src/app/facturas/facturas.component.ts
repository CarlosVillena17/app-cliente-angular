import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../interfaces/clientes';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FacturaService } from '../services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  autocompleteControl = new FormControl();
  productos: string[] = ['Carlos', 'Daniel', 'William', 'Eduardo'];
  productosFiltrados!: Observable<Producto[]>;

  titulo: string = 'Nueva Factura';
  factura: Factura = {
    id: 0,
    descripcion: '',
    observacion: '',
    items: [],
    cliente: {
      id: 0,
      nombre: '',
      apellido: '',
      createAt: '',
      email: '',
      foto: '',
      region: {
        id: 0,
        nombre: '',
      },
      facturas: [],
    },
    total: 0,
    createAt: '',
  };

  item: ItemFactura = {
    producto: {
      id: 0,
      nombre: '',
      precio: 0,
      createAt: '',
    },
    cantidad: 0,
    importe: 10,
  };

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let idcliente = Number(params['clienteid']);
      console.log(idcliente);
      this.clienteService.getCliente(idcliente).subscribe((cl) => {
        cl = cl as Cliente;
        this.factura.cliente = cl;
        console.log(cl);
      });
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      mergeMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    return this.facturaService.filtrarProductos(value);
  }

  mostrarNombre(producto?: Producto): string {
    return producto? producto.nombre: '';
  }

  seleccionarProducto(ev: MatAutocompleteSelectedEvent) {
    let productoItem = ev.option.value as Producto;
    console.log(ev);
    ev.option.focus();
    ev.option.deselect();
    this.item.producto=productoItem;
    this.factura.items.push(this.item)
    this.autocompleteControl.setValue('');

  }
}
