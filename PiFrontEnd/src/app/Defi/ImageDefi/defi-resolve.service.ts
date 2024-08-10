import { Injectable } from '@angular/core';
import { Defi } from 'src/app/model/Defi';
import { DefiProcessingService } from './defi-processing.service';
import { DefiServiceService } from 'src/app/Service/defi-service.service';
import { catchError, map, Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DefiResolveService {

  constructor(private image: DefiProcessingService, private productService: DefiServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Defi> {
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

  getProductDetails(): Defi {
    return {
      id:0,
      pointArrivee: "",
      name: "",
      pointSorite: "",
      price: 0,
      adresse:"",

      description: "",
      nbrPlaceDisponible: 0,
      gouvernorat:"",
      numero:0,
      imageModels: [],
      DateSorite: new Date(),

      title: "",
      acceptee:true,
  refusee:true
    };
  }
}
