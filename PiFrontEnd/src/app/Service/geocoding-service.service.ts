import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodingServiceService {

  private readonly apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  geocodeLocation(location: string): Promise<any> {
    const params = new HttpParams()
      .set('q', location)
      .set('format', 'json');
    return this.http.get(this.apiUrl, { params: params }).toPromise();
  }}
