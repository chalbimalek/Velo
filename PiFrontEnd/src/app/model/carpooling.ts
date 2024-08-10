import { Auser } from "./Auser";
import { FileHandle } from "./file_handle.model";

export interface Carpooling{
    idCarpolling:number;
    pointArrivee:string;
    gouvernorat:string;
    adresse:string;
    DateSorite:Date| null;

  numero:number;
  name:string;
  pointSorite:string;
  user?:Auser
  departLatitude:number,
  departLongitude:number,
  price:number;
  description:string;
  nbrPlaceDisponible:number;
  imageModels:FileHandle[];
  destinationLatitude: number;
  destinationLongitude: number;
  title: string;

  acceptee:boolean
  refusee:boolean

  }
