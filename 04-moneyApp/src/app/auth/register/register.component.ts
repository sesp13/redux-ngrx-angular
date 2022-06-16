import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.isLoading = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser(): void {
    if (this.registerForm.invalid) return;

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Loading',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { name, email, password } = this.registerForm.value;
    this.authService
      .createUser({ name, email, password })
      .then(() => {
        this.store.dispatch(stopLoading());
        // Swal.close();
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

  getFormField(field: string): AbstractControl | null {
    return this.registerForm.get(field);
  }
}
