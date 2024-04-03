import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/user/auth.service';

interface LoginRequest {
  email: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  effect = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.triggerEffect(); // Ativar o efeito quando o componente é carregado
  }

  triggerEffect() {
    this.effect = true;
    setTimeout(() => this.effect = false, 3000); // Duração do efeito de 5 segundos
  }

  login() {
    this.triggerEffect();

    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro de Validação',
        detail: 'O formulário de login é inválido.'
      });
      return;
    }

    this.loading = true;
    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro de Login',
          detail: 'Falha no login. Verifique suas credenciais.'
        });
        this.loading = false;
      }
    );
  }

  goToRegisterPage() {
    this.effect = true;
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 3000); // Delay of 5 seconds before navigating to the register page
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  loginWithGoogle() {
    // lógica de login com o Google aqui
  }
}
