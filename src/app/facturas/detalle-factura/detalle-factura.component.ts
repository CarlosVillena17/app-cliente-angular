import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from '../models/factura';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {


  factura!: Factura
  titulo: string="Factura";
  constructor(
    private facturaService: FacturaService,
    private activateRoute: ActivatedRoute) {  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe((params)=>{
      let id=Number(params['id'])
      this.facturaService.getFactura(id)
          .subscribe(
            (factura)=>{
              this.factura=factura;
              console.log(factura);
              console.log("GAAAAA")
            }
          )
    })

  }

}
