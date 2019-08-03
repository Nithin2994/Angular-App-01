import {Component} from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
@Component({
    selector:'app-order',
    templateUrl :'./order.component.html'
})
export class OrderComponent{

    orderStatus = false;
    orderId = new String('');
    get isOrderPlaced(){
        return this.orderStatus;
    }

    get getOrderId(){
        return this.orderId;
    }

    constructor(public web : WebService, private auth:AuthService){
        this.web.getCart(this.auth.name);
        this.auth.loadUserDetails();
        console.log('-->'+this.auth.userDetails.firstName);
    }

    placeOrder(){
         this.orderId = this.web.placeOrder(this.auth.name);
         console.log('Order Id : '+this.orderId);
         if(this.orderId != ''){
             this.orderStatus = true;
         }
         this.orderStatus = true;
    }
}