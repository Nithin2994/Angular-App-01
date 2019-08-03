import {Component} from '@angular/core';
import { AuthService } from './auth.service';
import { WebService } from './web.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from './address';

@Component({
    selector:'app-account',
    templateUrl:'./account.component.html'
})
export class AccountComponent {
    form;
    showOrders = false;
    showAddress = false;

    address = new Address();


    constructor(private fb: FormBuilder,public auth:AuthService,public web:WebService , private routes: Router){
       this.auth.loadUserDetails();
       this.loadOrderDetails();
    }

    loadOrderDetails(){
        this.web.getOrderDetails(this.auth.name);
    }

    showOrderDetails(){
        this.showOrders = true;
    }

    hideOrderDetails(){
        this.showOrders = false;
    }

    saveAddress(address){
        console.log(address);
        this.auth.saveAddress(this.auth.name,address);
        this.showAddress = false;
    }

    showEditAddress(){
        this.showAddress = true;
    }
}