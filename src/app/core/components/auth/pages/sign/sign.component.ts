import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss',
})
export default class SignComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);

  public formAuth: FormGroup = this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public msgError!: string;

  public submitForm() {
    if (this.formAuth.valid) {
      this.#authService
        .signIn({
          email: this.formAuth.value.email,
          password: this.formAuth.value.password,
        })
        .subscribe({
          next: (res) => res,
          error: (e) => (this.msgError = e),
        });
    }
  }
}
