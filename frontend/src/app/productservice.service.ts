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

   _cart= [] as any;
   cartSub: any;
   
   _order=[] as any;
   orderSub:any;

   _url='http://localhost:3000/products';
   
   _cartApi="http://localhost:7000/product";
   _getCart="http://localhost:7000/cart";

   _orderApi="http://localhost:4000/orders";
   
  
  constructor(private http:HttpClient) { 
    this.productsSub = new BehaviorSubject<any[]>(this._products); 
    this.cartSub = new BehaviorSubject<any[]>(this._cart); 
    this.orderSub = new BehaviorSubject<any[]>(this._order); 
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
 //when user clicks on add to cart product will be added to cart
 addProduct(product: any) {
     return this.http.post<any>(this._cartApi, product);
 }

getCart(){
  this.http.get<any[]>(this._getCart).subscribe(data=>{
    this._cart=[...data];
    this.cartSub.next([...this._cart]);
  });
}

displayCart(){
  return this.cartSub.asObservable();
}

getOrder(){
  this.http.get<any[]>(this._orderApi).subscribe(data =>{
    this._order=[...data];
    this.orderSub.next([...this._order]);
  });
}

displayOrder(){
  return this.orderSub.asObservable();

}

 /*
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

*/
}
  


