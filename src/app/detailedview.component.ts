import {Component} from '@angular/core';
import {ActivatedRoute , Router} from '@angular/router';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
    selector:'detailed-view',
    templateUrl : './detailedview.component.html',
    styleUrls:['./detailedview.component.css']
})
export class DetailedViewComponent{

    mobile = "123123";
    name = "";
    constructor(public route: ActivatedRoute, public webService : WebService, private auth:AuthService,
            private router : Router){
        this.name = this.route.snapshot.params.name;
        this.webService.getMobiles(this.name);
        this.webService.getCart(this.auth.name)
        this.webService.getWishlist(this.auth.name);
        console.log("name :: "+name);
    }

    addToCart(product){
        if(this.auth.name){
            this.webService.addToCart(this.auth.name,product);
        }else{
            this.router.navigateByUrl('/Login');
        }
    }

    addToWishlist(product){
        if(this.auth.name){
            this.webService.addToWishlist(this.auth.name,product);
        }else{
            this.router.navigateByUrl('/WishList');
        }
        
    }
    
}