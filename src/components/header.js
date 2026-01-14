// Componente de Header
export class Header {
    static render(isLanding = false) {
        if (isLanding) {
            return `
                <header class="header">
                    <div class="header-content">
                        <div class="logo">Gabriela</div>
                        <nav class="nav">
                            <a href="/" class="nav-link" data-link>Home</a>
                            <a href="#servicos" class="nav-link">Serviços</a>
                            <a href="#depoimentos" class="nav-link">Depoimentos</a>
                            <a href="/dashboard" class="btn btn-primary btn-sm" data-link>Acessar Sistema</a>
                        </nav>
                    </div>
                </header>
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
                        <a href="/" class="nav-link" data-link>Sair</a>
                    </nav>
                </div>
            </header>
        `;
    }
}
