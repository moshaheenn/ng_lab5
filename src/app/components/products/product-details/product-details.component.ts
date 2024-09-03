import { Component } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product:IProduct={} as IProduct
  pId:any|null=null
  subscription!:Subscription
  constructor(private _ProductsService:ProductsService,private _Router:Router,private _ActivatedRoute:ActivatedRoute){
  }
  ngOnInit():void
  {
    this._ActivatedRoute.paramMap.subscribe(param=>{
      this.pId=param.get('id');
    })
    this.getById();
  }

  getById()
  {
    if (this.pId) {
      this.subscription=this._ProductsService.getProductById(this.pId).subscribe({
        next: (data: IProduct) => {
          this.product = data;
          console.log(this.product);
        },
      })
  };
}
ngOnDestroy(): void {
  this.subscription.unsubscribe()
}
}
