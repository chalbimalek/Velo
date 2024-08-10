import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Collocation } from 'src/app/model/Collocation';
import { CollocationProcessingService } from './collocation-processing.service';
import { CollocationServiceService } from 'src/app/Service/collocation-service.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollocationResolveService implements Resolve<Collocation>{

  constructor(private image: CollocationProcessingService, private productService: CollocationServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collocation> {
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

  getProductDetails(): Collocation {
    return {
      idCollocation:0,
      distanceAfac: "",
      name: "",
      lieux: "",
      price: 0,
      adresse:"",
      description: "",
      nbrPlaceDisponible: 0,
      numero:0,
      imageModels: [],
      DateSortie:new Date(2024, 2, 19, 12, 0, 0) 
    };
  }
}




