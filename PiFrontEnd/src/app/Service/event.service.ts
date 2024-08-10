import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { event1 } from '../model/event1';
import { AuthService } from './auth.service';
import { Type_Event } from '../model/enumerations/Type_Event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8080/api/event';
  constructor(private authservice:AuthService,private http: HttpClient){}

  addProduct(productData: FormData){
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    // Utilisez les en-têtes définis pour l'envoi de données
return this.http.post<event1>(`${this.baseUrl}/addd`,productData, { headers });
}
public getProductById(pid:number){
  const token = this.authservice.getToken();
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
return this.http.get<event1>("http://localhost:8080/api/event/"+pid, { headers })
}
public getAllProduct(){
  const token = this.authservice.getToken();
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
return this.http.get<event1[]>("http://localhost:8080/api/event/getall", { headers })
}
getProductsByCategory(category: Type_Event): Observable<Type_Event[]> {
  return this.http.get<Type_Event[]>(this.baseUrl+"/events", { params: { category: category } });
}

private ratingKeyPrefix = 'productRating_';
private ratingSubjects: { [productId: number]: BehaviorSubject<number> } = {};

private getRatingKey(productId: number): string {
  return this.ratingKeyPrefix + productId;
}

private initRating(productId: number): void {
  const ratingKey = this.getRatingKey(productId);
  const storedRating = localStorage.getItem(ratingKey);
  const initialRating = storedRating ? parseInt(storedRating, 10) : 0;
  this.ratingSubjects[productId].next(initialRating);
}

setRating(productId: number, rating: number): void {
  const ratingKey = this.getRatingKey(productId);
  localStorage.setItem(ratingKey, rating.toString());
  if (!this.ratingSubjects[productId]) {
    this.ratingSubjects[productId] = new BehaviorSubject<number>(rating);
    this.initRating(productId);
  } else {
    this.ratingSubjects[productId].next(rating);
  }
}

getRating(productId: number): Observable<number> {
  if (!this.ratingSubjects[productId]) {
    this.ratingSubjects[productId] = new BehaviorSubject<number>(0);
    this.initRating(productId);
  }
  return this.ratingSubjects[productId].asObservable();
}

clearRating(productId: number): void {
  const ratingKey = this.getRatingKey(productId);
  localStorage.removeItem(ratingKey);
  if (this.ratingSubjects[productId]) {
    this.ratingSubjects[productId].next(0);
  }
}













  /////////
 getevnts() {
    return this.http.get(`http://localhost:8080/api/event/retrieveallevents`);
  }

  addevent(eventData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/event/Ajouter',
      eventData
    );
  }
  public addFile(formData:FormData,id:any): Observable<any>{
   
    return this.http.post(`http://localhost:8080/api/event/AddeventFile/${id}`,formData, {  reportProgress :true, observe:'events'});
  }
  public retrieveFile(id:any):Observable<Blob>{
    
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(`http://localhost:8080/api/event/retrieveFile/${id}`,
      { headers : headers,
               responseType: 'blob'
        });
  }


  deletevent(id: any) {
    return this.http.delete(
      'http://localhost:8080/api/event/removeEvent/' + id
    );
  }

  updateevent(id: any, eventData: any): Observable<any> {
    return this.http.put(
      `http://localhost:8080/api/event/modifyEvent/${id}`,
      eventData
    );
  }

  getEventById(id: any) {
    return this.http.get(
      `http://localhost:8080/api/event/events/${id}`
    );
  }

}
