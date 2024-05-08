import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccededComponent } from './succeded/succeded.component';
import { PaymentIntComponent } from './payment-int/payment-int.component';
import { AccountSellerComponent } from './account-seller/account-seller.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';
import { SubCompComponent } from './sub-comp/sub-comp.component';
import { PlanSubComponent } from './plan-sub/plan-sub.component';

const routes: Routes = [

{path:'succeeded', component:SuccededComponent},
{path:'purchase',component:PaymentIntComponent},
{path:'accountTotal',component:AccountSellerComponent},
{path:'adminPurchase',component:CardPurchaseComponent},
{ path: 'success', component: SuccededComponent },
{path:'subscription',component:SubCompComponent},
{path:'plan',component:PlanSubComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
