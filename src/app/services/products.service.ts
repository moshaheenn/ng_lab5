import { IProduct } from './../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseApi='http://localhost:3000';
  constructor(private _HttpClient: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${this.baseApi}/products`);
  }
  getProductById(prId:any):Observable<IProduct>
  {
    return this._HttpClient.get<IProduct>(`${this.baseApi}/products/${prId}`);
  }
  addNewProduct(product:IProduct):Observable<IProduct[]>
  {
    return this._HttpClient.post<IProduct[]>(`${this.baseApi}/products`,product);
  }
  editProduct(product: IProduct, prId: any): Observable<IProduct[]> {
    return this._HttpClient.put<IProduct[]>(`${this.baseApi}/products/${prId}`, product);
  }
  deleteProduct(prId:any):Observable<IProduct[]>
  {
    return this._HttpClient.delete<IProduct[]>(`${this.baseApi}/products/${prId}`);
  }

}
