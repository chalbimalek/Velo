import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../model/product';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file_handle.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/enumerations/Category';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent  implements OnInit {
  productFormm!: FormGroup;
  file = [];
  image:string='';
  public indexImage: object = {};
  formData: FormData = new FormData();
  isLinear=true;
  myForm!: FormGroup;

  product:Product ={
    idProduct:0,
    reference:"",
    name:"",
    quantity:0,
    price:0,
    description:"",
    adresse:"",
    numero:0,
    brand:"",
    imageModels:[],
    category: Category.ELECTRONICS,
    deliveryDays:0
  }
  ngOnInit(): void {
   
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
    private productService: ProductService ,private router :Router, private sannitizer: DomSanitizer) {
    this.productFormm = new FormGroup({
      name: new FormControl("inserer", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      
    });
  }
  showForm: boolean = true;

  onClickSubmitForm() {

    if (!this.productFormm.invalid) {
      console.log(this.productFormm.value);
   //   const formData = new FormData();
    //  this.productObj.name = this.productFormm.value.name;
     // this.productObj.brand = this.productFormm.value.brand;
      //this.productObj.description = this.productFormm.value.description;
      
      // this.productService.addProduct(this.productObj, this.file[0]).subscribe(data =>
    //  this.productService.addProduct(this.product).subscribe(data =>
        
      //  console.log(data)
      //)
     // Swal.fire('Success!', 'Event added successfully!', 'success');
      
      // To reset the form
     this.productFormm.reset();
    // this.showForm = false;
    } else {
    }
  }
  myImage!: Observable<any>;
  base64code!: any;
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    //console.log(file)
    this.convertToBase64(file)
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      // console.log(d)
      this.myImage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
  
  }
  onSubmit(productForm :NgForm) {

    const preparedFormData=this.preparedFormData(this.product);
    this.productService.addProduct(preparedFormData).subscribe(
      (response :Product) => {
        console.log('Produit ajouté avec succès');

        productForm.reset;
        this.product.imageModels=[];
        productForm.resetForm();
      
        // Rediriger vers la liste des produits
        this.router.navigate(['/marketplace']);
  
        // Afficher une alerte de succès
        Swal.fire('Success!', 'Produit ajouté avec succès', 'success');
        // Réinitialiser le formulaire ou rediriger vers une autre page
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        console.error('Erreur lors de l\'ajout du produit:', error);
        // Gérer l'erreur
      }
    );
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
  @ViewChild('selectfile') selectfile!: ElementRef<HTMLInputElement>;

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
currentDate!: Date;



categoryOptions = Object.values(Category).map(value => ({ label: value, value: value }));

onCategoryChange(event: any) {
  this.product.category = event.target.value;
  console.log("Selected Category:", this.product.category);
  // Autres traitements à effectuer lorsque la catégorie est sélectionnée
}


  
}
 
  