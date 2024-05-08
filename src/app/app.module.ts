import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectedSellerComponent } from './src/app/connected-seller/connected-seller.component';
import { PaymentIntComponent } from './payment-int/payment-int.component';
import { HttpClientModule } from '@angular/common/http';
import { SuccededComponent } from './succeded/succeded.component';
import { RouterModule } from '@angular/router';
import { AccountSellerComponent } from './account-seller/account-seller.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';
import { LoaderComponent } from './loader/loader.component';
import { SubCompComponent } from './sub-comp/sub-comp.component';
import { PlanSubComponent } from './plan-sub/plan-sub.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectedSellerComponent,
    PaymentIntComponent,
    SuccededComponent,
    AccountSellerComponent,
    CheckoutComponent,
    CardPurchaseComponent,
    LoaderComponent,
    SubCompComponent,
    PlanSubComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
