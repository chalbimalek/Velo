import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collocation } from '../model/Collocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollocationServiceService {

  private baseUrl = 'http://localhost:8080/api'; // L'URL de base de votre backend

  constructor(private httpClient: HttpClient) { }

  addProduct(productData: FormData){
   
  
    // Créer les en-têtes de la requête avec le token JWT inclus dans le header Authorization
    const headers = new HttpHeaders
 
        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<Collocation>(`${this.baseUrl}/collocation/addd`,productData, { headers });
  }
  public getProductById(pid:number){
    return this.httpClient.get<Collocation>("http://localhost:8080/api/collocation/"+pid)
  }
  public getAllProduct(pageNumber:any){
    return this.httpClient.get<Collocation[]>(this.baseUrl + "/collocation/getall?pageNumber="+pageNumber)
  }



  searchProducts(searchTerm: any): Observable<Collocation[]> {
    // Convertir l'objet searchTerm en chaîne de requête pour l'URL
    let queryString = Object.keys(searchTerm)
      .filter(key => searchTerm[key]) // Exclure les clés vides ou nulles
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(searchTerm[key]))
      .join('&');

    // Exécuter la requête HTTP GET avec la chaîne de requête
    return this.httpClient.get<Collocation[]>(`${this.baseUrl}?${queryString}`);
  }
  public deleteProduct(id:number){
   return this.httpClient.delete("http://localhost:8080/api/collocation"+"/delete/"+id);
    }

    public searchCarpoolingbyGouv(gouv:string){
      return this.httpClient.get<Collocation[]>(this.baseUrl+"/collocation/searchbygouvernerat/"+gouv);
    }

}

