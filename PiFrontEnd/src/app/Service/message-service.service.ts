import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/Message';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private baseUrl = 'http://localhost:8080/api'; // URL de votre backend Spring Boot

  constructor(private http: HttpClient, private authService: AuthService) { }

  sendMessage(message: Message): Observable<any> {
    const token = this.authService.getToken(); // Obtenez le jeton d'authentification depuis votre service d'authentification
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(`${this.baseUrl}/send-message`, message, { headers });
  }

  getAllMessagesForCurrentUser(): Observable<Message[]> {
    const token = this.authService.getToken(); // Obtenez le jeton d'authentification depuis votre service d'authentification
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Message[]>(`${this.baseUrl}/current-user`, { headers });
  }
}
