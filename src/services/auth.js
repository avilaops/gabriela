// Serviço de Autenticação
export class AuthService {
    constructor() {
        this.storageKey = 'gabriela_auth';
        // ATENÇÃO: Credenciais removidas por segurança
        // Auth deve ser feito via backend com POST /auth/login
        this.apiUrl = this.getApiUrl();
    }

    getApiUrl() {
        // Em produção, trocar para URL real da API
        return window.location.hostname === 'localhost' 
            ? 'http://localhost:5000/api'
            : 'https://api.gabrielarincao.com.br/api';
    }

    // Fazer login
    async login(email, password) {
        // TODO: Implementar chamada para backend
        // Temporariamente bloqueado até backend estar pronto
        console.error('❌ Auth desabilitado: backend necessário');
        return { success: false, error: 'Sistema de autenticação em manutenção. Entre em contato.' };
        
        /* Implementação futura:
        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem(this.storageKey, JSON.stringify(data.session));
            }
            return data;
        } catch (error) {
            return { success: false, error: 'Erro ao conectar ao servidor' };
        }
        */
    }

    // Login temporário para DEV APENAS (remover depois)
    devLogin() {
        if (window.location.hostname !== 'localhost') {
            console.error('❌ devLogin só funciona em localhost');
            return { success: false };
        }
        
        const session = {
            email: 'dev@localhost',
            nome: 'Gabriela Rincão (DEV)',
            role: 'admin',
            loginAt: new Date().toISOString()
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(session));
        return { success: true, session };
    }

    // Fazer logout
    logout() {
        localStorage.removeItem(this.storageKey);
    }

    // Verificar se está autenticado
    isAuthenticated() {
        const session = this.getSession();
        return session !== null;
    }

    // Obter sessão atual
    getSession() {
        const sessionData = localStorage.getItem(this.storageKey);
        if (sessionData) {
            try {
                return JSON.parse(sessionData);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Verificar se é admin
    isAdmin() {
        const session = this.getSession();
        return session && session.role === 'admin';
    }

    // Middleware para proteger rotas
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.hash = '#/login';
            return false;
        }
        return true;
    }
}

// Exportar instância única
export const authService = new AuthService();
