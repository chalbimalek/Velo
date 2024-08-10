import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CarppolingServiceService } from '../Service/carppoling-service.service';
import { Carpooling } from '../model/carpooling';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MapleafletComponent } from '../mapleaflet/mapleaflet.component';
import { AdminService } from '../Service/admin.service';

@Component({
  selector: 'app-pop-content',
  templateUrl: './pop-content.component.html',
  styleUrls: ['./pop-content.component.css']
})
export class PopContentComponent {
  data : any;
  carpooling: Carpooling = {
    idCarpolling: 0,
    pointArrivee: '',
    gouvernorat: '',
    adresse: '',
    numero: 0,
    name: '',
    pointSorite: '',
    price: 0,
    description: '',
    departLatitude:0,
    departLongitude:0,
    nbrPlaceDisponible: 0,
    imageModels:[],
    DateSorite: new Date(),
    destinationLatitude: 0,
    destinationLongitude: 0,
    title: "",
    acceptee:true,
    refusee:true
  };

  @Output() okClicked = new EventEmitter<void>();
  @ViewChild(MapleafletComponent) mapleafletComponent: any;

  
  constructor(private carppolingServiceService: CarppolingServiceService , private adminService : AdminService) { }
  onMapClick(event: L.LeafletMouseEvent): void {
    // Récupérer les coordonnées du clic
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // Assigner les coordonnées à votre objet carpooling
    this.carpooling.destinationLatitude = lat;
    this.carpooling.destinationLongitude = lng;
  }

  onOkClick(productForm: NgForm): void {
    const formData = this.preparedFormData(this.carpooling);
        this.adminService.getData().subscribe((data) => { 

          formData.departLatitude=data.position1.lat
          formData.departLongitude=data.position1.lng
          formData.destinationLatitude=data.position2.lat
          formData.destinationLongitude=data.position2.lng
               }
             );
    this.carppolingServiceService.addProduct1(formData).subscribe(
      (result: Carpooling) => {
        console.log('Carpooling ajouté avec succès !', result);
        this.resetForm(productForm); // Réinitialiser le formulaire après ajout réussi
        this.okClicked.emit(); 
        Swal.fire('Success!', 'Carpooling ajouté avec succès', 'success');
        this.mapleafletComponent
        
        // Émettre un événement pour indiquer que l'ajout est effectué
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du carpooling :', error);
        // Traitez ici les erreurs de l'ajout du carpooling
      }
    );
  }
  
  preparedFormData(product: Carpooling): any {


    console.log(product);
    // Renvoie simplement l'objet Carpooling sous forme de JSON
    return product;
  }
  
  
  
  

  resetForm(productForm: NgForm): void {
    productForm.resetForm(); // Réinitialiser le formulaire
    this.carpooling = {
      idCarpolling: 0,
      pointArrivee: '',
      gouvernorat: '',
      adresse: '',
      numero: 0,
      name: '',
      pointSorite: '',
      price: 0,
      description: '',
      nbrPlaceDisponible: 0,
      imageModels: [],
      DateSorite: new Date(),
      destinationLatitude: 0,
      destinationLongitude: 0,
      departLatitude:0,
      departLongitude:0,
      title: '',
      acceptee:true,
      refusee:true
    };
  }


  

}
