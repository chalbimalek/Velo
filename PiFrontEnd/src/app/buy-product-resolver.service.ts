import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './model/product';
import { ImageProcessingService } from './image/image-processing.service';
import { Observable, map } from 'rxjs';
import { ProductService } from './Service/product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private ProductService: ProductService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id= route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout")
    return this.ProductService.getProductDetails(isSingleProductCheckout, id)
    .pipe(
      map(
        (x: Product[], i)=> x.map((product : Product) => this.imageProcessingService.createImages(product))
      )
    );

  }
}
