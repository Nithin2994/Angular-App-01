import {Component} from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector:'app-searchresult',
    templateUrl :'./searchresult.component.html'
})
export class SearchResultComponent {
    constructor(public web : WebService){
        this.web.getMobiles(null);
    }
}