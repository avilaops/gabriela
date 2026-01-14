// Sistema de roteamento SPA
import { LandingPage } from '../pages/landing.js';
import { DashboardPage } from '../pages/dashboard.js';
import { ClientesPage } from '../pages/clientes.js';
import { AgendaPage } from '../pages/agenda.js';
import { FinanceiroPage } from '../pages/financeiro.js';
import { Header } from '../components/header.js';

export class Router {
    constructor() {
        this.routes = {
            '/': LandingPage,
            '/dashboard': DashboardPage,
            '/clientes': ClientesPage,
            '/agenda': AgendaPage,
            '/financeiro': FinanceiroPage
        };
        
        this.currentPage = null;
    }

    init() {
        // Listener para mudanças de URL
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Interceptar cliques em links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });

        // Carregar rota inicial
        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState(null, null, path);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const PageClass = this.routes[path] || this.routes['/'];
        
        // Destruir página anterior
        if (this.currentPage && typeof this.currentPage.destroy === 'function') {
            this.currentPage.destroy();
        }
        
        // Renderizar nova página
        const app = document.getElementById('app');
        app.innerHTML = '';
        
        this.currentPage = new PageClass();
        const content = await this.currentPage.render();
        app.innerHTML = content;
        
        // Inicializar menu mobile do header
        Header.initMobileMenu();
        
        // Inicializar página
        if (typeof this.currentPage.init === 'function') {
            this.currentPage.init();
        }
    }

    getCurrentPath() {
        return window.location.pathname;
    }
}
