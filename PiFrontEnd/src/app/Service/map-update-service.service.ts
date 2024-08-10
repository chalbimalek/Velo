import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapUpdateServiceService {

  private newCarpoolingAddedSource = new Subject<{ latitude: number, longitude: number, title: string }>();

  newCarpoolingAdded$ = this.newCarpoolingAddedSource.asObservable();

  constructor() {}

  emitNewCarpoolingAdded(latitude: number, longitude: number, title: string) {
    this.newCarpoolingAddedSource.next({ latitude, longitude, title });
  }}
