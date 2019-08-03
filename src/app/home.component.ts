import {Component, OnInit} from '@angular/core'
import { WebService } from './web.service';
@Component({
    selector : 'app-home',
    templateUrl : './home.component.html'
})
export class HomeComponent{

    constructor(private web : WebService){
    }

    searchQuery = "";
    loadSearchResults(event){
        if(event.srcElement.value){
            this.searchQuery = event.srcElement.value;
            console.log(this.searchQuery);
            this.web.loadSearchItems('All',this.searchQuery,1);
        }else{
            this.searchQuery = "";
            this.web.loadSearchItems('All','All',1);
        }
    }

    changePriceFilter(pricefilter){
        console.log(pricefilter.value);
        console.log(this.searchQuery);
        if(pricefilter.value == "2"){
            this.web.loadSearchItems('All',this.searchQuery,2);
        }else{
            this.web.loadSearchItems('All',this.searchQuery,1);
        }
    }

    changeLaunchFilter(launchfilter){
        console.log(launchfilter.value);
        if(launchfilter.value == "3"){
            this.web.loadSearchItems('All',this.searchQuery,3);
        }else{
            this.web.loadSearchItems('All',this.searchQuery,4);
        }
    }
}