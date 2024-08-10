import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carpooling } from '../model/carpooling';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { notification } from '../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class CarppolingServiceService {

  private baseUrl = 'http://localhost:8080/api'; // L'URL de base de votre backend

  constructor(private authservice:AuthService,private httpClient: HttpClient) { }

  addProduct(productData: FormData){
    // Créer les en-têtes de la requête avec le token JWT inclus dans le header Authorization
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
 
        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<Carpooling>(`${this.baseUrl}/carpooling/addd`,productData, { headers });
  }
  addProduct1(Carpooling: Carpooling){
    // Créer les en-têtes de la requête avec le token JWT inclus dans le header Authorization
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
 
        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<Carpooling>(`${this.baseUrl}/carpooling/adddd`,Carpooling, { headers });
  }

  reserverCovoiturage(carpoolingId: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.post<string>(`${this.baseUrl}/carpooling/reserver?carpoolingId=${carpoolingId}`, null, { headers });
  }

  accepterOuRefuserCovoiturage(carpoolingId: number, accepter: boolean, userId: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    const url = `http://localhost:8080/api/carpooling/accepterOuRefuser/${carpoolingId}/${accepter}/${userId}`;
  
    return this.httpClient.post<string>(url, null, { headers });
  }
  annulerAcceptationCovoiturage(carpoolingId: number, userId: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    const url = `http://localhost:8080/api/carpooling/annulerAcceptation/${carpoolingId}/${userId}`;
  
    return this.httpClient.post<string>(url, null, { headers });
  }  
  getNotificationsForUser(): Observable<notification[]> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<notification[]>(`${this.baseUrl}/carpooling/user`, { headers });
  }
  envoyerNotification(message: string): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.post<string>(`${this.baseUrl}/carpooling/send`, message, { headers });
  }

  public getProductById(pid:number){
    return this.httpClient.get<Carpooling>("http://localhost:8080/api/carpooling/"+pid)
  }
  public getAllProduct(pageNumber:any){
    return this.httpClient.get<Carpooling[]>(this.baseUrl + "/carpooling/getall?pageNumber="+pageNumber)
  }



  searchProducts(searchTerm: any): Observable<Carpooling[]> {
    // Convertir l'objet searchTerm en chaîne de requête pour l'URL
    let queryString = Object.keys(searchTerm)
      .filter(key => searchTerm[key]) // Exclure les clés vides ou nulles
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(searchTerm[key]))
      .join('&');

    // Exécuter la requête HTTP GET avec la chaîne de requête
    return this.httpClient.get<Carpooling[]>(`${this.baseUrl}?${queryString}`);
  }
  public deleteProduct(id:number){
   return this.httpClient.delete("http://localhost:8080/api/carpooling"+"/delete/"+id);
    }

    public searchCarpoolingbyGouv(gouv:string){
      return this.httpClient.get<Carpooling[]>(this.baseUrl+"/carpooling/searchbygouvernerat/"+gouv);
    }

    calculatePoints(): Observable<number> {
      const token = this.authservice.getToken();
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return this.httpClient.get<number>("http://localhost:8080/api/carpooling/calculatePoints", {headers});
    }

}

