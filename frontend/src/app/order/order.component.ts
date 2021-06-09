import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  myOrders=[]  as any;

  constructor(private _productservice:ProductserviceService) { }
 

  ngOnInit(): void {
    this._productservice.getOrder();
    this._productservice.displayOrder().subscribe((data: any)=>{
      this.myOrders=[...data];
    });
  }

}
