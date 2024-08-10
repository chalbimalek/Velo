import { FileHandle } from "./file_handle.model";

export interface Collocation{
    idCollocation:number;
    distanceAfac:string;
    lieux:string;
    adresse:string;
  numero:number;
  name:string;
  price:number;
  description:string;
  nbrPlaceDisponible:number;
  DateSortie:Date;
  imageModels:FileHandle[];


  }