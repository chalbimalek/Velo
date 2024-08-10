import { Category } from "./enumerations/Category";
import { FileHandle } from "./file_handle.model";

export interface Product{
  idProduct:number;
  reference:string;
  adresse:string;
  numero:number;
  name:string;
  quantity:number;
  price:number;
  description:string;
  category:Category
  brand:string;
  imageModels:FileHandle[];
  deliveryDays: number; // Assurez-vous d'inclure le délai de livraison dans l'interface Product

  }