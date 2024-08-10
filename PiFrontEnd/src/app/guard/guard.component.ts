import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.css']
})
export class GuardComponent implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
  ): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']); // Assurez-vous que la route de redirection est correcte
      return false;
    }
  }
}




