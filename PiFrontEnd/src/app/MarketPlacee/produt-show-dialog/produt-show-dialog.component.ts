import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '../../model/file_handle.model';

@Component({
  selector: 'app-produt-show-dialog',
  templateUrl: './produt-show-dialog.component.html',
  styleUrls: ['./produt-show-dialog.component.css']
})
export class ProdutShowDialogComponent implements OnInit{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}
  
  
  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
    
  }
  
  
 



}
