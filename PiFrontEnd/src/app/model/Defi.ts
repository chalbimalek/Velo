import { Auser } from "./Auser";
import { FileHandle } from "./file_handle.model";

export interface Defi{
    id:number;
    pointArrivee:string;
    gouvernorat:string;
    adresse:string;
    DateSorite:Date| null;

  numero:number;
  name:string;
  pointSorite:string;
  user?:Auser

  price:number;
  description:string;
  nbrPlaceDisponible:number;
  imageModels:FileHandle[];

  title: string;

  acceptee:boolean
  refusee:boolean

  }
