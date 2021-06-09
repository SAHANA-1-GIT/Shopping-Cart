import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CollectionsComponent } from './collections/collections.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CollectionsComponent,
    CartComponent,
    OrderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
