import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationServiceService } from 'src/app/Service/collocation-service.service';
import { Collocation } from 'src/app/model/Collocation';

@Component({
  selector: 'app-details-collocation',
  templateUrl: './details-collocation.component.html',
  styleUrls: ['./details-collocation.component.css']
})
export class DetailsCollocationComponent implements OnInit {

  selectProductIndex = 0;
  product!: Collocation;

  constructor(private activatedRoute: ActivatedRoute, private router : Router,
    private productService: CollocationServiceService) { }

  ngOnInit(): void {

   this.product = this.activatedRoute.snapshot.data['product'];
    
  }

  changeIndex(index:any){
    this.selectProductIndex=index;
  }


  currentDate: Date = new Date();

}
  
