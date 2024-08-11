import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { DefiServiceService } from 'src/app/Service/defi-service.service';

@Component({
  selector: 'app-accepted-users-dialog',
  templateUrl: './accepted-users-dialog.component.html',
  styleUrls: ['./accepted-users-dialog.component.css']
})
export class AcceptedUsersDialogComponent implements OnInit {

  acceptedUsers: string[] = [];
  winningStatus: { [key: string]: boolean } = {};

  constructor(
    private defiService: DefiServiceService,
    public dialogRef: MatDialogRef<AcceptedUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.defiService.getAcceptedUsers().subscribe(
      (data: string[]) => {
        this.acceptedUsers = data;
        console.log("kk",data);

      },
      error => {
        console.error('Error fetching accepted users', error);
      }
    );
  }
  checkWinning(user: string): void {
    this.defiService.isWinning(user).subscribe(
      (isWinning: boolean) => {
        this.winningStatus[user] = isWinning;
      },
      error => {
        console.error('Error checking winning status', error);
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
