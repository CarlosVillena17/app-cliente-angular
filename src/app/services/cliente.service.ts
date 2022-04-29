import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/clientes';
import { map, Observable, tap } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';
import swal from 'sweetalert2'
import { Region } from '../interfaces/region';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private UrlEndpoint:string="http://localhost:8080/api/clientes";
  private httpHeaders=new HttpHeaders({'Content-Type': 'application/json'});
  clientes: Cliente[]=[
  ];
  constructor(
    private http: HttpClient,
    private router: Router) { }

  getClientes(page:number): Observable<any> {
    return this.http.get<Cliente[]>(`${this.UrlEndpoint}/page/${page}`)
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.UrlEndpoint, cliente,
      {headers: this.httpHeaders} ).pipe(
        map(
          (response: any)=> response.cliente as Cliente
        ),
        catchError( e =>{
          if(e.status===400){
            return throwError( () => e );
          }
          console.error(e.error.mensaje)
          swal.fire('Error al editar', e.error.mensaje, 'error')
          return throwError( () => e );
        })
      );
  }

  getCliente(id: number): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.UrlEndpoint}/${id}`)
            .pipe(
              catchError( e=>
                {
                  this.router.navigate(['/clientes'])
                  console.log(e.error.mensaje);
                  swal.fire('Error al editar', 'No se encontro el ID del cliente', 'error')
                  return throwError( () => e );
                }
              )
            )
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.UrlEndpoint}/${cliente.id}`,
                                    cliente,
                                    {headers: this.httpHeaders})
                                    .pipe(
                                      catchError( e =>{
                                        if(e.status===400){
                                          return throwError( () => e );
                                        }
                                        console.error(e.error.mensaje)
                                        swal.fire('Error al editar', e.error.mensaje, 'error')
                                        return throwError( () => e );
                                      })
                                    );
  }
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.UrlEndpoint}/${id}`, {headers: this.httpHeaders}).
    pipe(
      catchError( e =>{
        console.error(e.error.mensaje)
        swal.fire('Error al editar', e.error.mensaje, 'error')
        return throwError( () => e );
      })
    );
  }

  subirFoto(archivo: File, id:  any){
    let formData=new FormData(); //clase de javaScript
    formData.append("archivo",archivo);
    formData.append("id",id);
    return this.http.post<any>(`${this.UrlEndpoint}/upload`, formData)
        .pipe(
          map(
            (response: any) => response.cliente as Cliente
          ),
          catchError(
            e =>{
              console.error(e.error.mensaje)
              swal.fire('Error al subir foto', e.error.mensaje, 'error')
              return throwError( () => e );
            }
          )
        )
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.UrlEndpoint}/regiones`);
  }

}
