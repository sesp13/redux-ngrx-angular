import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getFormField(field: string): AbstractControl | null {
    return this.loginForm.get(field);
  }

  login() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Loading',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUser(email, password)
      .then(() => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: err?.message,
          icon: 'error',
        })
      );
  }
}
