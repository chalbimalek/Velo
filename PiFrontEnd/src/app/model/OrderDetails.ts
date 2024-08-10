import { OrderQuantity } from "./OrderQuantity";

export interface OrderDetails {

      fullName : String;
	  fullAddress: String;
	  contactNumber : String;
	  alternateContactNumber : String;
	  orderProductQuantityList : OrderQuantity[];
	  deliveryDate: Date;
}