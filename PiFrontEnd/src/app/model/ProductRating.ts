import { Auser } from "./Auser";

    export interface ProductRating{

        rating:number,
        comment:String,
        user?:Auser
    }