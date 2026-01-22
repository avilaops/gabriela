// Sistema de roteamento SPA
import { LandingPage } from '../pages/landing.js';
import { LoginPage } from '../pages/login.js';
import { DashboardPage } from '../pages/dashboard.js';
import { ClientesPage } from '../pages/clientes.js';
import { AgendaPage } from '../pages/agenda.js';
import { FinanceiroPage } from '../pages/financeiro.js';
import { Header } from '../components/header.js';
import { authService } from '../services/auth.js';
import { Utils } from '../utils/utils.js';

export class Router {
    constructor() {
        this.routes = {
            // Rotas públicas
            '/': { page: LandingPage, requireAuth: false },
            '/login': { page: LoginPage, requireAuth: false },
            
            // Rotas administrativas (protegidas)
            '/dashboard': { page: DashboardPage, requireAuth: true },
            '/clientes': { page: ClientesPage, requireAuth: true },
            '/agenda': { page: AgendaPage, requireAuth: true },
            '/financeiro': { page: FinanceiroPage, requireAuth: true }
        };
        
        this.currentPage = null;
    }

    init() {
        // Login automático apenas em desenvolvimento
        if (Utils.isDevelopment() && !authService.isAuthenticated()) {
            Utils.log('Executando login automático de desenvolvimento');
            authService.devLogin?.();
        }

        // Listener para mudanças de hash
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Interceptar cliques em links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                this.navigate(href);
            }
        });

        // Carregar rota inicial
        this.handleRoute();
    }

    navigate(path) {
        // Garantir que o path tem #
        if (!path.startsWith('#')) {
            path = '#' + path;
        }
        window.location.hash = path;
    }

    getPath() {
        // Obter path do hash (#/dashboard -> /dashboard)
        let path = window.location.hash.slice(1) || '/';
        // Remover query string se houver
        path = path.split('?')[0];
        return path;
    }

    async handleRoute() {
        const path = this.getPath();
        const route = this.routes[path] || this.routes['/'];
        
        // Verificar autenticação
        if (route.requireAuth && !authService.isAuthenticated()) {
            // Redirecionar para login
            window.location.hash = '#/login';
            const loginRoute = this.routes['/login'];
            await this.renderPage(loginRoute.page);
            return;
        }

        // Se está autenticado e tenta acessar login, redirecionar para dashboard
        if (path === '/login' && authService.isAuthenticated()) {
            window.location.hash = '#/dashboard';
            const dashboardRoute = this.routes['/dashboard'];
            await this.renderPage(dashboardRoute.page);
            return;
        }
        
        // Renderizar página
        await this.renderPage(route.page);
    }

    async renderPage(PageClass) {
        // Destruir página anterior
        if (this.currentPage && typeof this.currentPage.destroy === 'function') {
            this.currentPage.destroy();
        }
        
        // Renderizar nova página
        const app = document.getElementById('app');
        app.innerHTML = '';
        
        this.currentPage = new PageClass();
        const content = await this.currentPage.render();
        // Envolver conteúdo em <main> para acessibilidade
        app.innerHTML = `<main id="main-content" role="main">${content}</main>`;
        
        // Inicializar menu mobile do header
        Header.initMobileMenu();
        
        // Executar afterRender se existir
        if (typeof this.currentPage.afterRender === 'function') {
            await this.currentPage.afterRender();
        }
        
        // Inicializar página (método legado)
        if (typeof this.currentPage.init === 'function') {
            this.currentPage.init();
        }
    }

    getCurrentPath() {
        return this.getPath();
    }
}
