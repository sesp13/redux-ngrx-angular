import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  getFormField(field: string): AbstractControl | null {
    return this.loginForm.get(field);
  }

  login(): void {
    if (this.loginForm.invalid) return;

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Loading',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUser(email, password)
      .then(() => {
        // Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          title: 'Error!',
          text: err?.message,
          icon: 'error',
        });
      });
  }
}
