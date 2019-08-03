import { Address } from "./address";
import { Product } from "./products";

export class Order{
    public orderId : String;
    public userName : String;
    public itemsOrderd : [Product];
    public orderAmount : Number;
    public deliveryAddress : Address;
    public status : String;
    
    constructor(){}
}