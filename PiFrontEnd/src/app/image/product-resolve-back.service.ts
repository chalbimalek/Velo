import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';
import { ProductService } from '../Service/product.service';
import { ImageProcessingService } from './image-processing.service';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../model/enumerations/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveBackService implements Resolve<Product>{

  constructor(private image: ImageProcessingService, private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("id");
    if (id) {
      const productId = parseInt(id, 10);
      return this.productService.getProductById(productId).pipe(
       map(p => (this.image.createImages(p))),
        catchError(error => {
          console.error("Error fetching product details:", error);
          return of(this.getProductDetails()); // Retourner un produit vide en cas d'erreur
        })
      );
    } else {
      return of(this.getProductDetails());
    }
  }

  getProductDetails(): Product {
    return {
      idProduct:0,
      reference: "",
      name: "",
      quantity: 0,
      price: 0,
      description: "",
      brand: "",
      adresse:"",
      numero:0,
      imageModels: [],
      category: Category.ELECTRONICS,
      deliveryDays:0
    };
  }
}
