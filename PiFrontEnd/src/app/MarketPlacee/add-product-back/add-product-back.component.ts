import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../../model/product';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../Service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file_handle.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from 'src/app/model/enumerations/Category';

@Component({
  selector: 'app-add-product-back',
  templateUrl: './add-product-back.component.html',
  styleUrls: ['./add-product-back.component.css']
})
export class AddProductBackComponent implements OnInit {
 

isnewProduct=true;

  product:Product ={
    idProduct:0,
    reference:"",
    name:"",
    adresse:"",
    numero:0,
    quantity:0,
    price:0,
    description:"",
    brand:"",
    imageModels:[],
    category: Category.ELECTRONICS,
    deliveryDays:0
  };
  ngOnInit(): void {
  this.product= this.activatedRouter.snapshot.data['product'];
  if(this.product && this.product.idProduct){
    this.isnewProduct=false;
  }
  }
  selectedFile: File | undefined;
  productData: Product = {} as Product;
  quantity: number = 0;
  files: File[] = [];
 // define an empty array of Media objects
  
  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];

  }
  constructor(
    private productService: ProductService ,private activatedRouter:ActivatedRoute,private route:Router, private sannitizer: DomSanitizer) {
    
  }
  
  
  onSubmit(productForm :NgForm) {
  //  if (productForm.valid) {
    const preparedFormData=this.preparedFormData(this.product);
    this.productService.addProduct(preparedFormData).subscribe(
      (response :Product) => {
        console.log('Produit ajouté avec succès');
        productForm.reset;
        this.product.imageModels=[]
        // Réinitialiser le formulaire ou rediriger vers une autre page
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        console.error('Erreur lors de l\'ajout du produit:', error);
        // Gérer l'erreur
      }
    );
  //}else {   console.error('Formulaire invalide. Veuillez remplir tous les champs obligatoires.');}
  
  }
  preparedFormData(product :Product):FormData{
    const formData =new FormData();
    formData.append(
      'product',
      new Blob ([JSON.stringify(product)], {type :'application/json'})
);   

        for(var i = 0 ;i <product.imageModels.length; i++){
          formData.append(
            'imageFile',
            product.imageModels[i].file,
            product.imageModels[i].file.name
          );
        }
        return formData;
  }

  onFileSelectedd(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const FileHandle:FileHandle ={
        file:file,
        url:this.sannitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.imageModels.push(FileHandle);
    }
  }
  removeImage(i:number){
    this.product.imageModels.splice(i,1)
  }
  fileDropped(file_handle:FileHandle){
      this.product.imageModels.push(file_handle);
  }
 
showproduct(){
  this.route.navigate(['back/showback'])
}

@ViewChild('selectfile') selectfile!: ElementRef<HTMLInputElement>;

    // Autres méthodes de votre composant...

    isFileInputInvalid(): boolean {
      // Vérifier si selectfile et selectfile.nativeElement sont définis
      if (this.selectfile && this.selectfile.nativeElement) {
        // Vérifier si selectfile.nativeElement.files est défini
        if (this.selectfile.nativeElement.files) {
            // Vérifier si des fichiers sont sélectionnés
            return this.selectfile.nativeElement.files.length === 0 && this.selectfile.nativeElement.getAttribute('required') !== null;
        }
    }
    // Retourner false si selectfile, selectfile.nativeElement ou selectfile.nativeElement.files sont nuls
    return false;
}

}
 

