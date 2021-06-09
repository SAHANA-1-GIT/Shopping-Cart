import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import { CollectionsComponent} from './collections/collections.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent} from './order/order.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'collections', component:CollectionsComponent},
  {path:'cart', component:CartComponent},
  {path:'orders', component:OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  HomeComponent,LoginComponent,SignupComponent,CollectionsComponent,CartComponent,OrderComponent
]
