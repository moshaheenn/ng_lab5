import { IProduct } from './../../models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
/**
 *
 */
constructor(private _ProductsService:ProductsService, private _Router:Router, private _ActivatedRoute:ActivatedRoute) {
}
products:IProduct[]=[];
subscription!:Subscription
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next:(response)=>{
        console.log(response);
        this.products = response;
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
  deleteProduct(id:any)
  {
    this._ProductsService.deleteProduct(id).subscribe({
      next:(()=>
      {
        this._Router.navigate(['/products']);
        this.products=this.products.filter((product)=>product.id != id)
      })
    })
  }
}
