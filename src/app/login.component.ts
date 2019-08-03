import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    template: `
    
    <div class="body" style="padding:4em;">
    <h2>Login</h2>
            <input style="width:20em" [(ngModel)]="loginData.email" placeholder="Email" type="email"><br>

            <input style="width:20em" [(ngModel)]="loginData.password" placeholder="Password" type="password"><br>

            <button style="width:10em" class="button" (click)="login()">Login</button>
    </div>
    `
})
export class LoginComponent {
    constructor(public auth: AuthService,public webService : WebService, private route : Router) { }

    loginData = {
        email: '',
        password: ''
    }

    login() {
        
        this.auth.login(this.loginData);
       
    }
}