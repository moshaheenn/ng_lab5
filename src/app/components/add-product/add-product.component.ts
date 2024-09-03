import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProduct!: IProduct;
  product!: IProduct;
  pId: string | null = null;
  subscription!: Subscription;
  updatedProduct!:IProduct;
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required])
  });

  constructor(
    private apiServ: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.pId = param.get('id');
      this.getById();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  assignData() {
    this.newProduct = this.addProductForm.value;
    console.log(this.newProduct);
    this.sendData();
  }

  sendData() {
    this.apiServ.addNewProduct(this.newProduct).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: err => console.error('Error adding product', err)
    });
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get price() {
    return this.addProductForm.get('price');
  }

  get quantity() {
    return this.addProductForm.get('quantity');
  }

  editData() {
    this.updatedProduct = this.addProductForm.value;
    if (this.pId) {
      this.subscription = this.apiServ.editProduct(this.updatedProduct,this.pId).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: err => console.error('Error fetching product', err)
      });
    }
  }

  getById() {
    if (this.pId) {
      this.subscription = this.apiServ.getProductById(this.pId).subscribe({
        next: (data: IProduct) => {
          this.product = data;
          console.log(this.product);
          this.addProductForm.patchValue(this.product); 
        },
        error: err => console.error('Error fetching product', err)
      });
    }
}
}