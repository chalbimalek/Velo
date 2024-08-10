import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Service/product.service';
import { Product } from '../../../model/product';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ImageProcessingService } from '../../../image/image-processing.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit{
  public productDetails: Product[] = [];

constructor(private router : Router,private productservice:ProductService,private sanitizer:DomSanitizer,private imageProcessingService:ImageProcessingService){}
ngOnInit(): void {
  this.getAllProducts();
}
public getAllProduct(){
  this.productservice.getAllProduct(this.pageNumber).
  pipe(
   map((products: Product[],i) => products.map((product: Product) => this.imageProcessingService.createImages(product)))

  ).
  subscribe(
    (resp:Product[])=>{
    console.log(resp);
    this.productDetails=resp;
  },(error:HttpErrorResponse )=>{
    console.log(error);
  }
  );
}

getImageUrl(imageModel: any): SafeUrl {
  // Extract base64 data from the 'bytes' property of the imageModel
  const base64Data = imageModel.bytes;
  // Create a data URL from the base64 data
  const imageUrl = 'data:image/png;base64,' + base64Data;
  // Sanitize the URL to avoid security risks
  return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

////////////////
pageNumber: number = 0;
  showLoadButton = false;


 
  public getAllProducts(){
    this.productservice.getAllProduct(this.pageNumber)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        if(resp.length == 8){
          this.showLoadButton = true;
        }else{this.showLoadButton = false}
        resp.forEach(p => this.productDetails.push(p));
        // this.productDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }

  public loadMoreProduct(){

    this.pageNumber = this.pageNumber+1;
    this.getAllProducts();
  }
   pages !:Array<number>;
   setpage(i:any,event:any){
      event.preventDefault();
      this.pageNumber=i;
      this.getAllProduct();
   }

  goToProduct(id:any){
    this.router.navigate(['back/detailback',{id : id}]);
  }

}
