import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
    { path: 'products/:id', component: ProductDetailsComponent, title: 'Product Details' },
    { path: 'addproduct/:id', component: AddProductComponent, title: 'Add Product' }
];
