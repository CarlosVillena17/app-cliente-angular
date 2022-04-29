import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../facturas/models/factura';
import { Producto } from '../facturas/models/producto';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private URLEndPoint: string= 'http://localhost:8080/api/facturas'
  constructor(private http: HttpClient) {

   }

   getFactura(id: number): Observable<Factura> {
     return this.http.get<Factura>(this.URLEndPoint+'/'+id)
   }

   delete(id: number): Observable<void>{
     return this.http.delete<void>(this.URLEndPoint+'/'+id)
   }

   filtrarProductos(term:string): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.URLEndPoint+'/filtrar-productos/'+term)
   }
}
