import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
   public Products = [{"productimage":"https://www.mensitaly.com/images1/Mens-Cream-Suits.jpg","productname":"dress","price":"1299rs","category":"women"},
                      {"productimage":"https://www.mensitaly.com/images1/Mens-Cream-Suits.jpg","productname":"dress","price":"799rs","category":"kids"}
                 ];

  myProducts=[] as any;    
 

  loggedIn=false;
  constructor(private productservice:ProductserviceService) { }
  
  ngOnInit(){
     this.productservice.getProducts();
     this.productservice.displayProducts().subscribe(data=>{
       this.myProducts=[...data];
     });

  }
  

  addItemToCart(product: { _id: any; }){
    
    this.productservice.addToCart(product._id);
  }
  
 
  itemInCart(product: any){
    return this.productservice.findItemInCart(product._id);
  }

}
