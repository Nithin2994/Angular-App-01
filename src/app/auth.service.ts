import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Address } from './address';
import { User } from './user';
import { Product } from './products';
@Injectable()
export class AuthService {

    BASE_URL = 'http://apartmentlogbook.com:2223/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    userDetails = new User();
    

    constructor(private http: Http, private router: Router) { 
       
    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }


    login(loginData) {
        console.log('Login :'+loginData);
        this.http.post(this.BASE_URL + '/login', loginData).subscribe(res => {
            this.authenticate(res);
        })
    }

    loadUserDetails(){
        var userName = localStorage.getItem(this.NAME_KEY);;
        this.http.get(this.BASE_URL + '/userDetails/'+userName).subscribe(response =>{
            this.userDetails = response.json();
            console.log('loadUserDetails');
            console.log(this.userDetails);
        })
        
    }

    get userAddress(){
        console.log('userDetails');
        console.log(this.userDetails);
        return this.userDetails.deliveryAddress;
    }

    register(user) {
        delete user.confirmPassword;
        
        let address = new Address();
        address.country = user.country;
        address.state = user.state;
        address.city = user.city;
        address.contact = user.contact;
        address.pincode = user.pincode;
        address.address = user.address;
        address.addressId = 1;

        let product = new Product();
        let productsList = Product[0];
        let userDetails = new User();
        userDetails.cart = productsList;
        userDetails.deliveryAddress = [address];
        userDetails.firstName = user.firstName;
        userDetails.email = user.email;
        userDetails.password = user.password;
        userDetails.dob = user.dob;
        userDetails.wishlist = productsList;
        userDetails.id = 123;
        
        this.http.post(this.BASE_URL + '/register', userDetails).subscribe(res => {
            this.authenticate(res);
        });
    }

    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    authenticate(res) {
        var authResponse = res.json();

        if (!authResponse.token)
            return;

        localStorage.setItem(this.TOKEN_KEY, authResponse.token)
        localStorage.setItem(this.NAME_KEY, authResponse.firstName)
        //this.loadUserDetails();
        this.router.navigateByUrl('/');
        window.location.reload();
        
    }

    saveAddress(userId,address){
        this.http.post(this.BASE_URL + '/saveAddress',
        {"userId":userId , "address":address}).subscribe(response =>{
            console.log("-->"+response.json());
            this.userDetails.deliveryAddress[0] = address;
        }, error => {    
            console.log("Unable to save address");
        });
    }
}