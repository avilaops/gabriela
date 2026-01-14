// Componente de Header
export class Header {
    static render(isLanding = false) {
        if (isLanding) {
            return `
                <header class="header">
                <div class="header-content">
                    <div class="logo">Gabriela Rincão</div>
                    <nav class="nav">
                        <a href="/" class="nav-link" data-link>Home</a>
                        <a href="#servicos" class="nav-link">Serviços</a>
                        <a href="#depoimentos" class="nav-link">Depoimentos</a>
                        <a href="/dashboard" class="btn btn-primary btn-sm" data-link>Acessar Sistema</a>
                    </nav>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                </header>
                
                <!-- Mobile Navigation -->
                <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
                <nav class="mobile-nav" id="mobile-nav">
                    <a href="/" class="mobile-nav-link" data-link>
                        <span>🏠</span> Home
                    </a>
                    <a href="#servicos" class="mobile-nav-link">
                        <span>✨</span> Serviços
                    </a>
                    <a href="#depoimentos" class="mobile-nav-link">
                        <span>💬</span> Depoimentos
                    </a>
                    <a href="/dashboard" class="mobile-nav-link" data-link>
                        <span>🔑</span> Acessar Sistema
                    </a>
                </nav>
            `;
        }
        
        const currentPath = window.location.pathname;
        
        return `
            <header class="header">
                <div class="header-content">
                    <div class="logo">Gabriela CRM</div>
                    <nav class="nav">
                        <a href="/dashboard" class="nav-link ${currentPath === '/dashboard' ? 'active' : ''}" data-link>Dashboard</a>
                        <a href="/clientes" class="nav-link ${currentPath === '/clientes' ? 'active' : ''}" data-link>Clientes</a>
                        <a href="/agenda" class="nav-link ${currentPath === '/agenda' ? 'active' : ''}" data-link>Agenda</a>
                        <a href="/financeiro" class="nav-link ${currentPath === '/financeiro' ? 'active' : ''}" data-link>Financeiro</a>
                        <a href="/" class="nav-link" data-link>← Voltar ao Site</a>
                    </nav>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>
            
            <!-- Mobile Navigation -->
            <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
            <nav class="mobile-nav" id="mobile-nav">
                <a href="/dashboard" class="mobile-nav-link ${currentPath === '/dashboard' ? 'active' : ''}" data-link>
                    <span>📊</span> Dashboard
                </a>
                <a href="/clientes" class="mobile-nav-link ${currentPath === '/clientes' ? 'active' : ''}" data-link>
                    <span>👥</span> Clientes
                </a>
                <a href="/agenda" class="mobile-nav-link ${currentPath === '/agenda' ? 'active' : ''}" data-link>
                    <span>📅</span> Agenda
                </a>
                <a href="/financeiro" class="mobile-nav-link ${currentPath === '/financeiro' ? 'active' : ''}" data-link>
                    <span>💰</span> Financeiro
                </a>
                <a href="/" class="mobile-nav-link" data-link>
                    <span>🏠</span> Voltar ao Site
                </a>
            </nav>
            
            <!-- Bottom Navigation Mobile -->
            <nav class="bottom-nav">
                <div class="bottom-nav-grid">
                    <a href="/dashboard" class="bottom-nav-item ${currentPath === '/dashboard' ? 'active' : ''}" data-link>
                        <span class="bottom-nav-icon">📊</span>
                        Dashboard
                    </a>
                    <a href="/clientes" class="bottom-nav-item ${currentPath === '/clientes' ? 'active' : ''}" data-link>
                        <span class="bottom-nav-icon">👥</span>
                        Clientes
                    </a>
                    <a href="/agenda" class="bottom-nav-item ${currentPath === '/agenda' ? 'active' : ''}" data-link>
                        <span class="bottom-nav-icon">📅</span>
                        Agenda
                    </a>
                    <a href="/financeiro" class="bottom-nav-item ${currentPath === '/financeiro' ? 'active' : ''}" data-link>
                        <span class="bottom-nav-icon">💰</span>
                        Financeiro
                    </a>
                </div>
            </nav>
        `;
    }
    
    static initMobileMenu() {
        // Mobile Menu Toggle
        const toggle = document.getElementById('mobile-menu-toggle');
        const overlay = document.getElementById('mobile-nav-overlay');
        const nav = document.getElementById('mobile-nav');
        
        if (!toggle || !overlay || !nav) return;
        
        function closeMobileMenu() {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            overlay.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        overlay.addEventListener('click', closeMobileMenu);
        
        // Close on navigation
        document.querySelectorAll('.mobile-nav-link, .bottom-nav-item').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}
                        <a href="/" class="nav-link" data-link>Sair</a>
                    </nav>
                </div>
            </header>
        `;
    }
}
