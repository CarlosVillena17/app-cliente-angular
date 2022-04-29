import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from '../models/factura';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.css']
})
export class FormFacturaComponent implements OnInit {
  factura!: Factura
  constructor(private facturaService: FacturaService) { }

  ngOnInit(): void {
  }

}
