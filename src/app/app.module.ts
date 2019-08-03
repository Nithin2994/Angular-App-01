import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import {FooterComponent} from './footer.component';
import {TitleComponent} from './title.component';
import {HomeComponent} from './home.component';
import {MobilesComponent} from './mobiles.component';
import {HttpModule} from '@angular/http';
import {WebService} from './web.service';
import {DetailedViewComponent} from './detailedview.component';
import {AuthService} from './auth.service';
import {RegisterComponent} from './register.component';
import {LoginComponent} from './login.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
import { CartComponent ,FilterPipe} from './cart.component';
import { SearchResultComponent } from './searchresult.component';
import { OrderComponent } from './order.component';
import { WishListComponent } from './wishlist.component';
import { AccountComponent } from './account.component';

var routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Mobiles',
    component: MobilesComponent
  },
  {
    path: 'DetailedView/:name',
    component: DetailedViewComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Cart',
    component:CartComponent
  },
  {
    path: 'PlaceOrder',
    component : OrderComponent
  },
  {
    path:'WishList',
    component : WishListComponent
  },
  {
    path : 'MyAccount',
    component : AccountComponent
  }
];



@NgModule({
  declarations: [
    AppComponent,FooterComponent,TitleComponent,HomeComponent,
    MobilesComponent,DetailedViewComponent,AccountComponent,
    LoginComponent,RegisterComponent,CartComponent,FilterPipe,SearchResultComponent,OrderComponent,WishListComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes),HttpModule,FormsModule,ReactiveFormsModule,
    MatFormFieldModule,BrowserAnimationsModule,MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule
  ],
  providers: [WebService,AuthService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
