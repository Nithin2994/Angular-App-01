import {Component,Pipe, PipeTransform} from '@angular/core';
import { AuthService } from './auth.service';
import { WebService } from './web.service';
import { Router } from '@angular/router';
@Component({
    selector:'app-cart',
    templateUrl:'./cart.component.html',
    styleUrls:['./cart.component.css']
})
export class CartComponent {

    orderStatus = false;
    get isOrderPlaced(){
        return this.orderStatus;
    }
    constructor(public auth:AuthService,public web:WebService , private routes: Router){
        this.web.getCart(this.auth.name);
    }

    removeFromCart(product){
        console.log('removeFromCart'+product);
        this.web.removeFromCart(this.auth.name,product);

    }

    addToWishList(product){
        this.web.addToWishlist(this.auth.name,product);
        this.removeFromCart(product);
    }

    alterCart(event,product){
        var quantity = event.srcElement.value;
        this.web.removeFromCart(this.auth.name,product);
        if(quantity > 1){
            var i = 1;
            while(i < quantity){
                this.web.addToCart(this.auth.name,product);
                i = i + 1;
            }
        }
    }


    order(){
        //this.web.placeOrder(this.auth.name);
        this.routes.navigateByUrl('/PlaceOrder');
        //this.orderStatus = true;
    }
}

@Pipe({
    name: 'filterUnique',
    pure: false
  })
  export class FilterPipe implements PipeTransform {
  
    transform(value: any, args?: any): any {
      
      // Remove the duplicate elements
      // let uniqueArray = value.filter(function (el, index, array) { 
      //   return array.indexOf(el) == index;
      // });
      
      let uniqueArray = Array.from(new Set(value));
      
      return uniqueArray;
    }
  
  }