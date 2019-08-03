import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})
export class TitleComponent {

  constructor(public auth : AuthService,public webService:WebService, private route : Router){
    this.webService.getCart(this.auth.name);
  }

}
