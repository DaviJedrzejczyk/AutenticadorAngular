# Projeto Angular com Autenticação JWT

Este projeto é um exemplo simples de autenticação usando JSON Web Token (JWT) no Angular 17. Ele simula o processo de login e proteção de rotas utilizando um backend que gera tokens JWT para autenticar os usuários.

## 🚀 Funcionalidades

- **Login**: Autenticação de usuários e recebimento de um token JWT.
- **Proteção de Rotas**: Rotas restritas apenas para usuários autenticados com um token válido.
- **Interceptors HTTP**: Interceptor para adicionar automaticamente o token JWT no cabeçalho das requisições HTTP.
- **Logout**: Limpeza do token JWT armazenado e redirecionamento para a tela de login.

## 🛠️ Tecnologias Utilizadas

- **Angular 17**
- **TypeScript**
- **SCSS**
- **JWT** (JSON Web Token) para autenticação

## 📂 Estrutura do Projeto

- **Auth Service**: Serviço responsável pelo login, logout, armazenamento e verificação do token JWT.
- **Auth Guard**: Protege as rotas que precisam de autenticação.
- **HTTP Interceptor**: Adiciona o token JWT automaticamente nas requisições HTTP.
- **Components**: Componentes de login e páginas protegidas.

## 📋 Pré-requisitos

Certifique-se de ter o **Node.js** e o **Angular CLI** instalados em sua máquina.

## 🔧 Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio-jwt-angular.git
   cd seu-repositorio-jwt-angular
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do Backend**:
   Certifique-se de ter um backend com suporte a autenticação JWT. O backend deve retornar um token JWT ao fazer login e validar o token para proteger rotas.

4. **Configuração do Endpoint**:
   Altere a URL do endpoint de login no `auth.service.ts` para apontar para o seu backend.

## 🖥️ Como Rodar o Projeto

Após configurar o backend e as URLs, rode o projeto com o comando:

```bash
ng serve
```

Acesse o aplicativo em [http://localhost:4200](http://localhost:4200).

## 📌 Principais Componentes e Serviços

### AuthService

Responsável por gerenciar o token JWT. Funções principais:
- `login(credentials)`: Faz a autenticação e salva o token JWT.
- `logout()`: Remove o token JWT e redireciona para a tela de login.
- `isAuthenticated()`: Verifica se o token JWT é válido.

### Auth Guard

Protege rotas específicas para que apenas usuários autenticados possam acessá-las. O guard verifica se o usuário possui um token JWT válido.

### HTTP Interceptor

Intercepta requisições HTTP e adiciona o token JWT ao cabeçalho `Authorization`, permitindo que o backend autentique a requisição.

## 🔐 Exemplo de Configuração do AuthService

No `auth.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://seu-backend.com/api'; // Substitua pelo seu endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(`${this.apiURL}/login`, credentials).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Simples verificação se o token existe
  }
}
```

## 📌 Configurando o Interceptor

No `auth-interceptor.ts`:
```typescript
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);
  }
}
```

Adicione o interceptor no `app.module.ts`:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AppModule { }
```

## 🔒 Proteger Rotas com Auth Guard

No `auth.guard.ts`:
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

No `app-routing.module.ts`:
```typescript
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // outras rotas
];
```

## 📄 Licença

Este projeto é de código aberto e está licenciado sob os termos da [MIT License](LICENSE).

---

Com este projeto, você agora possui um sistema básico de autenticação JWT em Angular 17. Sinta-se à vontade para expandi-lo e integrá-lo a aplicações maiores!
