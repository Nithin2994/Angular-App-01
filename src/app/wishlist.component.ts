import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth.service';
import { WebService } from './web.service';
import { Router } from '@angular/router';
@Component({
    selector:'app-wishlist',
    templateUrl:'./wishlist.component.html'
})
export class WishListComponent implements OnInit{

    ngOnInit(){
        this.web.getWishlist(this.auth.name);
    }

    constructor(public auth:AuthService,public web:WebService , private routes: Router){
        this.web.getWishlist(this.auth.name);
        this.web.getCart(this.auth.name);
    }

    removeFromWishlist(product){
        console.log('removeFromWishlist'+product);
        this.web.removeFromWishlist(this.auth.name,product);

    }

    moveToCart(product){
        this.web.moveFromWishlistToCart(this.auth.name,product)
        this.removeFromWishlist(product);
        //this.web.placeOrder(this.auth.name);
        //this.routes.navigateByUrl('/Cart');
        //this.orderStatus = true;
    }
}