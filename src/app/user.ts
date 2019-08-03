import { Address } from "./address";
import { Product } from "./products";

export class User{
    public firstName:String;
    public email:String;
    public dob:Date;
    public password:String;
    public id: Number;
    public deliveryAddress : [Address];
    public cart : [Product];
    public wishlist : [Product];

    constructor(){}
}