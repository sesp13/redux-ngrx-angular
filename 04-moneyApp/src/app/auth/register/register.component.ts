import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createUser() {
    if (this.registerForm.invalid) return;

    Swal.fire({
      title: 'Loading',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { name, email, password } = this.registerForm.value;
    this.authService
      .createUser({ name, email, password })
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

  getFormField(field: string): AbstractControl | null {
    return this.registerForm.get(field);
  }
}
