import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../Service/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      lastename: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      roles: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.snackbar.open('Please fill all the fields correctly.', 'close', {
        duration: 5000,
      });
      return;
    }

    const formValue = this.signupForm.value;

    // Assurez-vous que les mots de passe correspondent
    if (formValue.password !== formValue.confirmPassword) {
      this.snackbar.open('Passwords do not match.', 'close', {
        duration: 5000,
      });
      return;
    }

    // Transformer le rôle sélectionné en un format attendu par le backend
    const rolesArray = formValue.roles ? [formValue.roles] : [];
    formValue.roles = rolesArray.map((roleName) => ({ name: roleName }));

    this.authService.register(formValue).subscribe(
      (data) => {
        this.snackbar.open('Sign up successful.', 'close', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error adding user:', error);
        this.snackbar.open('Failed to sign up.', 'close', { duration: 5000 });
      }
    );
  }
}