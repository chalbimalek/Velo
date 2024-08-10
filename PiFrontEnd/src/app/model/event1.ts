import { Type_Event } from "./enumerations/Type_Event";
import { FileHandle } from "./file_handle.model";

export interface event1{
    id_events:number;
  title:string;
  description:string;
  startDate:Date;
  endDate:Date;
  location_event:string;
  price:number;
  type_Event:Type_Event
  created:Date;
  imageModels:FileHandle[];
}