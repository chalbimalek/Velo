import { Auser } from "./Auser";
import { Carpooling } from "./carpooling";
import { Defi } from "./Defi";

export interface notification{

    message:String,
    timestamp:Date,
    userEnvoyer: Auser;
    userDestiner: Auser;
    defi:Defi,
    acceptee:boolean
    refusee:boolean
}
