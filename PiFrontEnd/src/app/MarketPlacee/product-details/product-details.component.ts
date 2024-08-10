import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  selectProductIndex = 0;
  product!: Product;
   constructor(
     private productService: ProductService,
     private route: ActivatedRoute
   ) {}
  
  ngOnInit(): void {
  
    this.product = this.route.snapshot.data['product'];
    
  }

  changeIndex(index:any){
    this.selectProductIndex=index;
  }

}

