import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  hidePassword = true;
  protected aFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [false], // Optionnel, selon si vous voulez implémenter cette fonctionnalité
    });
    this.aFormGroup = this.formBuilder.group({
   //   recaptcha: ['', Validators.required],
    });
  }
  siteKey: string = '6LevP4spAAAAAGORJ4Z3vjGfitgthh0dJjsHyOWE';
  private isAuthenticated: boolean = false;

  handleLogin() {
    if (this.loginFormGroup.invalid) {
      this.snackbar.open('Please fill all fields correctly.', 'close', {
        duration: 5000,
      });
      return;
    }
  
    this.authService.login(this.loginFormGroup.value).subscribe(
      (response) => {
        this.snackbar.open('Login successful.', 'close', { duration: 5000 });
        this.router.navigate(['/profile']); 
        console.log("avecc success");
        // Redirection vers la page de profil après une connexion réussie
      },
      (error) => {
        console.error('Login error:', error);
        this.snackbar.open(
          'Failed to log in. Please check your credentials.',
          'close',
          { duration: 5000 }
        );
        // Ne pas rediriger vers la page de profil en cas d'erreur
      }
    );
  }

}
