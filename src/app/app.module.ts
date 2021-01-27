import { ProductService } from './product.service';
import { CatagoryService } from './catagory.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { environment } from  './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my/my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule} from 'ng2-validation';
const routes: Routes = [
  {path:'' , component:ProductsComponent},
  {path:'products' , component:ProductsComponent},
  {path:'shopping-cart' , component:ShoppingCartComponent},
  {path:'check-out' , component:CheckOutComponent, canActivate:[AuthGuardService]} ,
  {path:'order-success' , component:OrderSuccessComponent, canActivate:[AuthGuardService]},
  {path:'login' , component:LoginComponent},
  {path:'admin/products/new' , component:ProductFormComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
  {path:'admin/products/:id' , component:ProductFormComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
  {path:'admin/products' , component:AdminProductsComponent, canActivate:[AuthGuardService, AdminAuthGuardService]},
  {path:'admin/orders' , component:AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path:'my/orders' , component:MyOrdersComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase) ,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CatagoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
