import { Cliente } from "src/app/interfaces/clientes";
import { ItemFactura } from "./item-factura";

export interface Factura {
   id:number;
   descripcion: string;
   observacion: string;
   items: Array<ItemFactura>;
   cliente: Cliente;
   total: number;
   createAt: string;
}
