import {Component, OnInit} from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector : 'app-mobiles',
    templateUrl : './mobiles.component.html',
    styleUrls:['./mobiles.component.css']

})
export class MobilesComponent implements OnInit{

    ngOnInit(){
        console.log('onInit');
        this.webService.getMobilesv1(null);
        this.webService.loadSearchItems('mobiles','All',1);
    }

    constructor (private webService : WebService){
        this.webService.getMobilesv1(null);
        this.webService.loadSearchItems('mobiles','All',1);
    }
      
    searchQuery = "";
    loadSearchResults(event){
        if(event.srcElement.value){
            this.searchQuery = event.srcElement.value;
            this.webService.loadSearchItems('mobiles',this.searchQuery,1);
        }else{
            this.searchQuery = "";
            this.webService.loadSearchItems('mobiles','All',1);
        }
    }

    changePriceFilter(pricefilter){
        console.log(pricefilter.value);
        if(pricefilter.value == "2"){
            this.webService.loadSearchItems('All',this.searchQuery,2);
        }else{
            this.webService.loadSearchItems('All',this.searchQuery,1);
        }
    }

    changeLaunchFilter(launchfilter){
        console.log(launchfilter.value);
        if(launchfilter.value == "3"){
            this.webService.loadSearchItems('All',this.searchQuery,3);
        }else{
            this.webService.loadSearchItems('All',this.searchQuery,4);
        }
    }
        
    
}