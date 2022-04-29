import { Producto } from "./producto";

export interface ItemFactura {
  producto: Producto;
  cantidad: number;
  importe: number;
}


