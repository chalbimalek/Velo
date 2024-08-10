import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { MyOrderDetails } from '../../model/MyOrderDetails';

@Component({
  selector: 'app-order-detais',
  templateUrl: './order-detais.component.html',
  styleUrls: ['./order-detais.component.css']
})
export class OrderDetaisComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No' ,'Status' ,'Action'];
  dataSource :MyOrderDetails[]= [];
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.productService.getAllOrderDetailsForAdmin().subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      }, (error) => {
        console.log(error);
      }
    );
  }


markasdelivered(orderId:any){
  console.log(orderId);
  
  this.productService.markOrderAsDelivered(orderId).subscribe(
    () => {
      // La mise à jour de la commande est gérée dans le service
    },
    (error) => {
      console.log("Erreur lors du marquage de la commande comme livrée :", error);
    }
  );
  

}

}