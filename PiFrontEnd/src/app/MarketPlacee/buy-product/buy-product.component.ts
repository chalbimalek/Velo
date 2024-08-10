import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { OrderDetails } from '../../model/OrderDetails';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CarppolingServiceService } from 'src/app/Service/carppoling-service.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent  implements OnInit {
  
  isSingleProductCheckout : string = "";
  productDetails : Product[]=[];
  orderDetails: OrderDetails={
    fullName : '',
	  fullAddress: '',
	  contactNumber : '',
	  alternateContactNumber : '',
	  orderProductQuantityList : [],
    deliveryDate: new Date()

  }
  constructor(private CarppolingService:CarppolingServiceService, private activatedRoute: ActivatedRoute,
    private productService : ProductService,
    private router: Router) { }

    ngOnInit(): void {
      this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
      this.loadStripe();
      this.getpoint();
      // Using the non-null assertion operator (!)
      this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout")!;
  
      this.productDetails.forEach(
          x => this.orderDetails.orderProductQuantityList.push(
              {
                  productId: x.idProduct,
                  quantity: 1
              }
          )
      );
      console.log(this.productDetails);
      console.log(this.orderDetails);
  }
  

  async placeOrder(orderForm: NgForm): Promise<void> {
    try {
      // Appeler la fonction pay pour effectuer le paiement
      await this.pay(this.getCalculatedGrandTotal());
      
      // Une fois le paiement effectué avec succès, placer la commande
      this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
        async (resp) => {
          console.log(resp);
          orderForm.reset();
          console.log("Confirmation");
          
          const firstOrderQuantity = this.orderDetails.orderProductQuantityList[0];
  
          // Vérifier si firstOrderQuantity est défini et a un 'productId'
          if (firstOrderQuantity && firstOrderQuantity.productId) {
            const productId = firstOrderQuantity.productId;
  
            try {
              // Charger les détails du produit depuis le service ou l'API
              const orderedProduct = await this.productService.getProductById(productId).toPromise();
              console.log('Order placed successfully:', resp);
    
              // Déclencher la tâche planifiée pour marquer les commandes comme livrées
              await this.productService.triggerScheduledMarkOrdersAsDelivered();
              // Vérifier si le produit a été trouvé
              if (orderedProduct) {
                const deliveryDays = orderedProduct.deliveryDays;
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  
                // Formater la date de livraison au format 'dd/MM/yyyy'
                const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
                // Afficher un message de succès avec la date de livraison estimée
                Swal.fire('Success!', `Your order has been placed successfully. It will be delivered to you by ${formattedDeliveryDate}.`, 'success');
                
                // Envoyer un email à l'administrateur
                this.sendEmailToAdmin();
                alert('Email sent to admin successfully!!');
                
                // Naviguer vers la page des commandes de l'utilisateur
                this.router.navigate(['/myOrders']);
                
                // Déclencher la méthode pour marquer les commandes comme livrées
               // this.productService.triggerScheduledMarkOrdersAsDelivered();
              } else {
                // Gérer le cas où le produit n'a pas été trouvé
                Swal.fire('Error', 'Product details not found. Please try again.', 'error');
              }
            } catch (error) {
              console.log('Error fetching product details:', error);
              // Gérer les erreurs de récupération des détails du produit
              Swal.fire('Error', 'An error occurred while fetching product details. Please try again.', 'error');
            }
          } else {
            // Gérer le cas où firstOrderQuantity n'est pas valide ou ne possède pas de 'productId'
            Swal.fire('Error', 'Invalid order details. Please try again.', 'error');
          }
        },
        (err) => {
          console.log(err);
          // Gérer les erreurs lors du placement de la commande ici
          Swal.fire('Error', 'An error occurred while placing your order. Please try again later.', 'error');
        }
      );
    } catch (error) {
      console.log('Error during payment:', error);
      // Gérer les erreurs de paiement ici
      Swal.fire('Error', 'An error occurred during payment. Please try again later.', 'error');
    }
  }
  
  getQuantityForProduct(productId:any){
    const filterProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filterProduct[0].quantity;

  }

  getCalculatedTotal(productId:any, productDiscountedPrice:any){
    const filterProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filterProduct[0].quantity*productDiscountedPrice;

  }

  onQuantityChanged(q:any, productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity=q;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price=this.productDetails.filter(product => product.idProduct === productQuantity.productId)[0].price
        grandTotal+=price*productQuantity.quantity;
      }
    );
    return grandTotal;
  }
  handler:any = null;
  payEnabled: boolean = false;

  pay(amount: any) : Promise<void> {
    return new Promise<void>((resolve, reject) => {   
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any) => {  // Utilisez une fonction fléchée ici aussi
        console.log(token)
        alert('Payment Success!!');
        this.payEnabled = true; // Assurez-vous que this fait référence à l'instance correcte de la classe
        resolve(); // Résoudre la promesse lorsque le paiement est effectué avec succès
        }
      });

      handler.open({
        name: 'COCO',
        description: 'Your order description', // Mettez la description de votre commande ici
        amount: amount * 100 // Convertir le montant en centimes si nécessaire
      });
    });
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',

          token: (token: any) => {  // Utilisez une fonction fléchée ici aussi
            console.log(token)
            alert('Payment Success!!');
            this.payEnabled = true; // Assurez-vous que this fait référence à l'instance correcte de la classe
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  //////////////////////////
  pageNumber: number = 0;

  sendEmailToAdmin(): void {
    this.productService.getAllProduct(this.pageNumber).subscribe(
      (products: Product[]) => {
        const htmlContent = this.generateProductHtml(products);

        const emailRequest = {
          to: 'mchalbi606@gmail.com',
          subject: 'New Order Received',
          text: htmlContent
        };

        this.productService.sendEmail(emailRequest).subscribe(
          response => {
            console.log('Email sent to admin successfully', response);
          },
          error => {
            console.error('Error sending email to admin', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  generateProductHtml(products: Product[]): string {
    let text = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Products Received</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f8f8f8; /* Couleur de fond */
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff; /* Couleur de fond du conteneur */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
            }
            h2 {
                color: #007bff; /* Couleur du titre */
                text-align: center;
            }
            .product-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .product-image {
                width: 100px;
                height: auto;
                margin-bottom: 10px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .product-name {
                font-size: 18px;
                font-weight: bold;
                color: #333;
                margin-bottom: 10px;
                text-align: center;
            }
            .product-brand {
                color: #666;
                margin-bottom: 5px;
                text-align: center;
            }
            .product-price {
                color: #28a745; /* Couleur du prix */
                font-weight: bold;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>New Products Received</h2>
    
            <!-- Boucle sur les produits pour afficher les cartes -->
           
            <div class="product-card">
            <img src="https://cdn.pixabay.com/photo/2021/03/19/13/40/online-6107598_640.png" alt="Produit technologique">
            <div class="product-name">bonjouur</div>
                <div class="product-brand"></div>
                <div class="product-price">merci pour votre confiance</div>
            </div>
           
    
        </div>
    </body>
    </html>
    
    `;

    products.forEach(product => {
      text += `
        <div class="product-card">
          <img src="${product.imageModels}" alt="Product Image" class="product-image">
          <h3>${product.name}</h3>
          <p>Brand: ${product.brand}</p>
          <p>Price: ${product.price} dt</p>
        </div>
      `;
    });

    text += `
          </div>
      </body>
      </html>
    `;

    return text;
  }

  totalCarpoolings: number = 0;

getpoint(){
  this.CarppolingService.calculatePoints().subscribe(
    (total: number) => {
      this.totalCarpoolings = total;
      console.log("your  points :" ,this.totalCarpoolings);
      this.calculateDiscountForAllProducts();
    },
    (error: any) => {
      console.log(error);
    }
  );
}
calculateDiscountForAllProducts() {
  // Assurez-vous que totalCarpoolings est défini
  if (this.totalCarpoolings === null || this.totalCarpoolings === undefined) {
    console.error("Le nombre total de points n'est pas défini.");
    return;
  }

  // Supposons que vous avez une liste de produits appelée 'products'
  // Vous pouvez la remplacer par la liste de produits réelle que vous utilisez
  const products: any[] = [/* liste de produits */];

  // Parcours de tous les produits pour calculer la réduction
  products.forEach(product => {
    // Vérifiez si le produit a un prix défini
    if (product.price === null || product.price === undefined) {
      console.error("Le prix du produit n'est pas défini :", product);
      return;
    }

    // Calculer la réduction pour ce produit
    const discountedPrice = this.calculateDiscount(product.price);
    console.log("Réduction pour le produit", product.name, ":", discountedPrice);
    // Vous pouvez affecter le prix réduit au produit si nécessaire
    // product.discountedPrice = discountedPrice;
  });
}

calculateDiscount(originalPrice: number): number {
  // Supposons que chaque point donne une réduction de 0.1 dt
  const discountPerPoint = 0.05;

  // Calculer la réduction totale en fonction du nombre de points obtenus
  const totalDiscount = this.totalCarpoolings * discountPerPoint;

  // Assurer que la réduction totale ne dépasse pas le prix original
  const discountedPrice = originalPrice - totalDiscount;
    console.log("points   ",this.totalCarpoolings);
    
    
  // Assurer que le prix après réduction est positif
  return Math.max(discountedPrice, 0);
}
}
