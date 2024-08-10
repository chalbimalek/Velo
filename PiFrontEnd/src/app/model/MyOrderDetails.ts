import { Product } from "./product";

export interface MyOrderDetails {
    orderId: number;
    orderFullName : string;
    orderFullOrder : string;
    orderContactNumber : string;
    orderAlternateContactNumber : string;
    orderStatus : string;
    orderAmount : number;
    product : Product;
    user : any;
}