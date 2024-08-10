import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Service/product.service';
import * as QRCode from 'qrcode';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qrdialog',
  templateUrl: './qrdialog.component.html',
  styleUrls: ['./qrdialog.component.css']
})
export class QRDialogComponent implements OnInit{
  product: any; // Déclarez le produit ici

  @ViewChild('qrcode', { static: false }) qrcode!: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.product = data.product; // Récupérez les données du produit depuis les données injectées
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const qrData = this.constructQRData(this.product);
    this.generateQRCode(qrData);
  }

  constructQRData(product: any): string {
    const productId = product.idProduct; // Récupérer l'ID du produit
    const url = `http://localhost:4200/detailback;id=${productId}`; // Construire l'URL avec l'ID du produit
    return url;
  }

  generateQRCode(qrData: string): void {
    QRCode.toCanvas(this.qrcode.nativeElement, qrData, (error) => {
      if (error) {
        console.error('Erreur lors de la génération du code QR:', error);
      }
    });
  }
}