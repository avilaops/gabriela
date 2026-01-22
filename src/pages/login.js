// Página de Login
import { authService } from '/src/services/auth.js';

export class LoginPage {
    async render() {
        // Se já está autenticado, redirecionar para dashboard
        if (authService.isAuthenticated()) {
            window.location.hash = '#/dashboard';
            return '';
        }

        return `
            <div style="
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: 
                    linear-gradient(135deg, rgba(212, 165, 116, 0.05) 0%, rgba(184, 145, 95, 0.05) 100%),
                    url('../background.avif');
                background-size: cover;
                background-position: center;
                background-blend-mode: overlay;
                padding: 24px;
            ">
                <div class="card" style="
                    max-width: 400px;
                    width: 100%;
                    padding: 48px 32px;
                    text-align: center;
                ">
                    <!-- Logo -->
                    <img src="./favicon-96x96.png" alt="Gabriela Rincão" style="
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 24px;
                        border-radius: 20px;
                    ">

                    <h1 style="margin-bottom: 8px; font-size: 1.75rem;">
                        Gabriela Rincão
                    </h1>
                    <p class="text-secondary" style="margin-bottom: 32px;">
                        Sistema Administrativo
                    </p>

                    <!-- Formulário de Login -->
                    <form id="loginForm" style="text-align: left;">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                class="form-control" 
                                placeholder="seu@email.com"
                                required
                                autocomplete="Email"
                            />
                        </div>

                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input 
                                type="password" 
                                id="password" 
                                class="form-control" 
                                placeholder="••••••••"
                                required
                                autocomplete="current-password"
                            />
                        </div>

                        <!-- Mensagem de erro -->
                        <div id="loginError" style="
                            display: none;
                            padding: 12px;
                            background: #fee;
                            color: #c33;
                            border-radius: 8px;
                            margin-bottom: 16px;
                            font-size: 0.875rem;
                        "></div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 16px;">
                            🔐 Entrar no Sistema
                        </button>
                    </form>

                    <!-- Link para área pública -->
                    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);">
                        <a href="#/" class="text-secondary" style="
                            text-decoration: none;
                            font-size: 0.875rem;
                        ">
                            ← Voltar para o site
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.setupLoginForm();
    }

    setupLoginForm() {
        const form = document.getElementById('loginForm');
        const errorDiv = document.getElementById('loginError');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted');

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            console.log('Email:', email, 'Password length:', password.length);

            // Validação básica
            if (!email || !password) {
                console.log('Campos vazios');
                this.showError('Por favor, preencha todos os campos');
                return;
            }

            // Tentar fazer login
            console.log('Chamando authService.login');
            const result = await authService.login(email, password);
            console.log('Resultado do login:', result);

            if (result.success) {
                // Login bem-sucedido
                console.log('Login sucesso, redirecionando');
                this.showSuccess('Login realizado! Redirecionando...');
                
                // Redirecionar após 500ms
                setTimeout(() => {
                    window.location.hash = '#/dashboard';
                }, 500);
            } else {
                // Mostrar erro
                console.log('Login falhou:', result.error);
                this.showError(result.error);
            }
        });
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';

            // Esconder após 5 segundos
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }

    showSuccess(message) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.background = '#efe';
            errorDiv.style.color = '#3a3';
            errorDiv.style.display = 'block';
        }
    }
}
