import { Injectable } from '@angular/core';
import { Defi } from '../model/Defi';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { notification } from '../model/Notification';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DefiServiceService {

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
    return this.httpClient.post<Defi>(`${this.baseUrl}/carpooling/addd`,productData, { headers });
  }
  addProduct1(Carpooling: Defi){
    // Créer les en-têtes de la requête avec le token JWT inclus dans le header Authorization
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<Defi>(`${this.baseUrl}/carpooling/adddd`,Carpooling, { headers });
  }

  reserverCovoiturage(id: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.post<string>(`${this.baseUrl}/carpooling/reserver?id=${id}`, null, { headers });
  }

  accepterOuRefuserCovoiturage(id: number, accepter: boolean, userId: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const url = `http://localhost:8080/api/carpooling/accepterOuRefuser/${id}/${accepter}/${userId}`;

    return this.httpClient.post<string>(url, null, { headers });
  }
  annulerAcceptationCovoiturage(id: number, userId: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const url = `http://localhost:8080/api/carpooling/annulerAcceptation/${id}/${userId}`;

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
    return this.httpClient.get<Defi>("http://localhost:8080/api/carpooling/"+pid)
  }
  public getAllProduct(pageNumber:any){
    return this.httpClient.get<Defi[]>(this.baseUrl + "/carpooling/getall?pageNumber="+pageNumber)
  }



  searchProducts(searchTerm: any): Observable<Defi[]> {
    // Convertir l'objet searchTerm en chaîne de requête pour l'URL
    let queryString = Object.keys(searchTerm)
      .filter(key => searchTerm[key]) // Exclure les clés vides ou nulles
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(searchTerm[key]))
      .join('&');

    // Exécuter la requête HTTP GET avec la chaîne de requête
    return this.httpClient.get<Defi[]>(`${this.baseUrl}?${queryString}`);
  }
  public deleteProduct(id:number){
   return this.httpClient.delete("http://localhost:8080/api/carpooling"+"/delete/"+id);
    }

    public searchCarpoolingbyGouv(gouv:string){
      return this.httpClient.get<Defi[]>(this.baseUrl+"/carpooling/searchbygouvernerat/"+gouv);
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
