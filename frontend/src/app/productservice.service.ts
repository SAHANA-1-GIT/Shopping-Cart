import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
   _products=[] as any;
   productsSub;
   _cart= [];
   cartSub: any;

   _url='http://localhost:3000/products';
   
   _cartApi="http://localhost:7000/product/:id";
   
  
  constructor(private http:HttpClient) { 
    this.productsSub = new BehaviorSubject<any[]>(this._products);     
  }

 getProducts(){
   this.http.get<any[]>(this._url).subscribe(data=>{
     this._products=[...data];
     this.productsSub.next([...this._products]);
   });
 }
  
 displayProducts(){
   return this.productsSub.asObservable();
 }
 
 getCart() {
   return this.cartSub.asObservable();
 }

 addToCart(id: any){
   const product = this.findItemInProducts(id);
   if(product.length !== 0){
     if(this.findItemInCart(id).length){
       this.removeFromCart(id);
     } else{
       this._cart.push(product[0] as never);
     }
     this.cartSub.next([...this._cart]);
   }
 }

 removeFromCart(id: any) {
   if(this.findItemInCart(id).length){
     const product = this.findItemInCart(id)[0];   
     const index = this._cart.indexOf(product);
     this._cart.splice(index ,1);
   }
   this.cartSub.next([...this._cart]);
 }

 clearCart(){
   this.cartSub.next([]);
 }

 
 findItemInCart(id: any){
  
   const product = this._cart.filter((product:{_id: any}) => product._id === id);
   return product;
   
 }

 findItemInProducts(id: any) {
   const product = this._products.filter((product: { _id: any; }) => product._id === id);
   return product;
 }

 checkOut(data: any) {
   return this.http.post(this._cartApi, data);
 }


}
  


