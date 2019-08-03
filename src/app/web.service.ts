import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs';
import { Subject  } from 'rxjs';
import { Order } from './order';
import { Product } from './products';

@Injectable()
export class WebService {
    BASE_URL = 'http://apartmentlogbook.com:2223/Electronics';

    CART_SIZE = "cartSize";

    private searchItemsStore = [];
    
    private searchItemSubject = new Subject();

    searchItems = this.searchItemSubject.asObservable();

    cartProducts = {};

    private productsStore = [];

    private productSubject = new Subject();
    
    products = this.productSubject.asObservable();

    private mobilesStore = [];

    private mobilesSubject = new Subject();
    
    mobiles = this.mobilesSubject.asObservable();

    private cartStore = [];

    private cartSubject = new Subject();
    
    cart = this.cartSubject.asObservable();

    private wishlistStore = [];

    private wishlistSubject = new Subject();
    
    wishlist = this.wishlistSubject.asObservable();

    orderDetails = new Order()[100];

    constructor(private http: Http ){
        this.getMobiles(null);
    }

    get cartSize(){
        return this.cartStore.length;
    }

    get wishlistSize(){
        console.log('size : '+this.wishlistStore.length)
        return this.wishlistStore.length;
    }

    get ordersSize(){
        return this.orderDetails.length;
    }

    loadSearchItems(category,query,filter){
        console.log(query+','+category);

        if(query === 'None'){
            this.searchItemsStore = [];
        }else if(category === 'All' && query === 'All'){
            console.log('>>All');
            console.log(this.productsStore);
            this.searchItemsStore = this.productsStore;
        }else if(category === 'All'){
            this.searchItemsStore = this.productsStore;
            
            this.searchItemsStore = Object.assign([], this.productsStore).filter(
                item => ((item.Name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                item.Brand.toLowerCase().indexOf(query.toLowerCase()) > -1))
             );
        }else if(query === 'All' && category === 'mobiles'){
            console.log('3rd if');
            console.log('>>All');
            console.log(this.productsStore);
            this.searchItemsStore = this.productsStore;
            
            console.log(this.productsStore);

            this.searchItemsStore = Object.assign([], this.productsStore).filter(
                item => (item.category === 'mobiles')
             );

             console.log(this.searchItemsStore);
        }else{
            this.searchItemsStore = this.productsStore;
            
            this.searchItemsStore = Object.assign([], this.productsStore).filter(
                item => (item.category === 'mobiles' && (item.Name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                item.Brand.toLowerCase().indexOf(query.toLowerCase()) > -1))
             );
        }
        
        if(filter == 1){
            this.searchItemsStore.sort((a, b) => {
                if (a.price <= b.price) return -1;
                else if (a.price > b.price) return 1;
                else return 0;
              });
         }else if(filter == 2){
            this.searchItemsStore.sort((a, b) => {
                if (a.price > b.price) return -1;
                else if (a.price <= b.price) return 1;
                else return 0;
              });
         }else if(filter == 3){
            this.searchItemsStore.sort((a, b) => {
                if (a.launchDate > b.launchDate) return -1;
                else if (a.launchDate <= b.launchDate) return 1;
                else return 0;
              });
         }else if(filter == 4){
            this.searchItemsStore.sort((a, b) => {
                if (a.launchDate <= b.launchDate) return -1;
                else if (a.launchDate > b.launchDate) return 1;
                else return 0;
              });
         }
         this.searchItemSubject.next(this.searchItemsStore);
    }


    isInCart(prd){
        console.log('isInCart');
        return this.isProductInStore(this.cartStore,prd);
    }

    isInWishlist(prd){
        console.log('isInWishlist');
        
        return this.isProductInStore(this.wishlistStore,prd);
    }

    isProductInStore(store,product){
        try{
            var matched = 0;
            if(store.length > 0){
                console.log("inside if");
                store.forEach(element => {
                 console.log("prod"+product.Name);
                 console.log("element.Name"+element.Name);
                    if(element.Name === product.Name){
                        console.log("Matched");
                        matched = 1;
                    }
                });
            }
         }catch{
             return false;
         }
         if(matched == 1){
             return true;
         }
         return false;
    }

    get cartValue(){
        var amount =0 ;
        this.cartStore.forEach(element => {
            amount = amount+ element.price;
        });
        return amount;
    }

    getCart(uName){
        this.http.get(this.BASE_URL + '/Cart/'+uName).subscribe(response => {
            this.cartStore = response.json();
            this.cartSubject.next(this.cartStore);

        }, error => {
            this.handleError("Unable to get messages");
        });
    }

    getWishlist(uName){
        this.http.get(this.BASE_URL + '/Wishlist/'+uName).subscribe(response => {
            this.wishlistStore = response.json();
            this.wishlistSubject.next(this.wishlistStore);

        }, error => {
            this.handleError("Unable to get messages");
        });
    }


    getMobilesv1(mobileName) {
        mobileName = (mobileName) ? '/'+mobileName : '' ; 
        this.http.get(this.BASE_URL + '/Mobilesv1'+mobileName).subscribe(response => {
            this.productsStore = response.json();
            this.productSubject.next(this.productsStore);
            this.searchItemsStore = this.productsStore;
            this.searchItemSubject.next(this.searchItemsStore);
            console.log('Mobilesv1');
        }, error => {
            this.handleError("Unable to get messages");
        });
    }

    getMobiles(mobileName) {
        mobileName = (mobileName) ? '/'+mobileName : '' ; 
        this.http.get(this.BASE_URL + '/Mobiles'+mobileName).subscribe(response => {
            this.productsStore = response.json();
            this.productSubject.next(this.productsStore);
            this.searchItemsStore = this.productsStore;
            this.searchItemSubject.next(this.searchItemsStore);
        }, error => {
            this.handleError("Unable to get messages");
        });
    }

    getMobile(mobileName) {
        console.log("getMobile :"+mobileName);
    }



    addToWishlist(firstName,product){
        console.log(firstName+'--'+product);
        this.http.put(this.BASE_URL + '/addToWishlist',
                {"uName":firstName,"product":product}).subscribe(response => {
                    console.log(response.json());
                    this.wishlistStore.push(product);
                    this.wishlistSubject.next(this.wishlistStore);
                }, error => {
                    this.handleError("Unable to get messages");
                });
    }

    removeFromWishlist(firstName,product){
        console.log(firstName+'--'+product);
        this.http.post(this.BASE_URL + '/removeFromWishlist',
                {"uName":firstName,"product":product}).subscribe(response => {
                    console.log(response.json());
                    this.getWishlist(firstName);
                }, error => {
                    this.handleError("Unable to remove from cart");
                });
    }

    moveFromWishlistToCart(firstName,product){
        this.addToCart(firstName,product);
        this.removeFromWishlist(firstName,product);
    }

    addToCart(firstName,product){
        console.log(firstName+'--'+product);
        this.http.put(this.BASE_URL + '/addToCart',
                {"uName":firstName,"product":product}).subscribe(response => {
                    console.log(response.json());
                    this.cartStore.push(product);
                    this.cartSubject.next(this.cartStore);
                }, error => {
                    this.handleError("Unable to get messages");
                });
        
    }

    removeFromCart(firstName,product){
        console.log(firstName+'--'+product);
        this.http.post(this.BASE_URL + '/removeFromCart',
                {"uName":firstName,"product":product}).subscribe(response => {
                    console.log(response.json());
                    this.getCart(firstName);
                }, error => {
                    this.handleError("Unable to remove from cart");
                });
    }

    placeOrder(firstName){
        console.log(">>>"+firstName);
        var productsList = Product[100];
        productsList = [];
        var product = new Product();
        var amount =0 ;
        this.cartStore.forEach(element => {
            amount = amount+ element.price;
            product.Brand = element.Brand;
            product.Name = element.Name;
            product.url = element.url;
            product.price = element.price;
            product.launchDate = new Date();
            productsList.push(product);
        });
        var order = new Order();
        order.orderId = 'ORD-'+firstName+'-'+this.getRandomInt(0,100)+(new Date()).getMilliseconds();
        order.userName = firstName;
        order.orderAmount = amount;
        order.itemsOrderd = productsList;
        order.deliveryAddress = null;
        order.status = 'Delivered';


        this.http.post(this.BASE_URL + '/placeOrder',
                {"order":order}).subscribe(response =>{
                    console.log("-->"+response.json());

                }, error => {    
                    console.log("Unable to place order");
                });
        this.cartStore = [];
        return order.orderId;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private handleError(error) {
        console.error(error);
    }

    getOrderDetails(firstName){

        this.http.get(this.BASE_URL + '/Orders/'+firstName).subscribe(response => {
           console.log('Order Details : '+response.json());
            this.orderDetails = response.json();
           
        })
    }
}