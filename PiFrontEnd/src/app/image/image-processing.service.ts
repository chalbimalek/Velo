import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { FileHandle } from '../model/file_handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(product :Product){
    

  console.log(product)
  const productImage:any[] =  product.imageModels;

  const productImageToFileHandle:FileHandle[]=[];

  for( let i=0 ; i < productImage.length ; i++ ){

    const imageFileData=productImage[i];

   const imageBlob= this.dataURIToblob(imageFileData.bytes,imageFileData.type);
 
    const imageFile= new File([imageBlob],imageFileData.name , {type:imageFileData.type });
  const finalFileHandle:FileHandle={
  file:imageFile,
  url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
};
    productImageToFileHandle.push(finalFileHandle);
  }
  product.imageModels=productImageToFileHandle;
  return product;
}


public dataURIToblob(picBytes:any,imageType:any){

  console.log(picBytes)
  console.log(imageType)

  
  const byteString=window.atob(picBytes);
  const arrayBuffer=new ArrayBuffer(byteString.length);
  const int8Array=new Uint8Array(arrayBuffer);

  for(let i = 0 ; i < byteString.length ; i++){
    int8Array[i]=byteString.charCodeAt(i);
  }
 const blob= new Blob([int8Array],{type:imageType});
  return blob;
}











}
