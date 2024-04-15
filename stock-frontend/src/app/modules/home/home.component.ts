import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    translate.setDefaultLang('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.triggerEffect();
  }

  triggerEffect() {
    this.effect = true;
    setTimeout(() => this.effect = false, 3000);
  }

  login() {
    this.triggerEffect();

    if (this.loginForm.invalid) {
      // Exibir mensagens de erro específicas para cada campo inválido
      if (this.loginForm.get('email')?.invalid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro de Validação',
          detail: 'O campo de email é obrigatório e deve ser um email válido.'
        });
      }
      if (this.loginForm.get('password')?.invalid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro de Validação',
          detail: 'O campo de senha é obrigatório.'
        });
      }
      return;
    }

    this.loading = true;
    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      (response) => {
        // Verificar se a resposta contém um token válido
        if (response && response.token) {
          // Armazenar o token no local storage ou em um serviço de armazenamento
          localStorage.setItem('token', response.token);
          this.loading = false;
          this.router.navigate(['/dashboard']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro de Login',
            detail: 'A resposta do servidor não contém um token válido.'
          });
          this.loading = false;
        }
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
    }, 3000);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  loginWithGoogle() {
    // Lógica de login com o Google aqui
  }
}