import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  

  products=[]  as any;
  totalPrice: any;
  findTotal(...products: any){
       for(let product of products){
         this.totalPrice=this.totalPrice+product.price;
       }
  }


  constructor(private productservice:ProductserviceService) { }
  
 
  ngOnInit(): void {
    
     this.productservice.getCart();
     this.productservice.displayCart().subscribe((data: any)=>{
       this.products=[...data];
     });
  }

}
