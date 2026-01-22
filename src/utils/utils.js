// Utilitários de segurança e formatação
export class Utils {
    /**
     * Sanitiza string para prevenir XSS
     * Remove tags HTML e caracteres especiais perigosos
     */
    static sanitizeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Formata moeda em reais
     */
    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    }

    /**
     * Formata telefone brasileiro
     */
    static formatPhone(phone) {
        if (!phone) return '-';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        return phone;
    }

    /**
     * Valida email
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida telefone brasileiro
     */
    static isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10 || cleaned.length === 11;
    }

    /**
     * Remove event listeners de um elemento
     */
    static removeAllEventListeners(element) {
        if (!element) return;
        const clone = element.cloneNode(true);
        element.parentNode?.replaceChild(clone, element);
        return clone;
    }

    /**
     * Determina se está rodando no navegador
     */
    static isBrowser() {
        return typeof window !== 'undefined' && typeof window.location !== 'undefined';
    }

    /**
     * Verifica se o hostname é considerado ambiente local
     */
    static isLocalhost(hostname) {
        return ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
    }

    /**
     * Retorna true quando estiver em ambiente de desenvolvimento
     */
    static isDevelopment() {
        if (this.isBrowser()) {
            const hostname = window.location.hostname;
            if (this.isLocalhost(hostname)) {
                return true;
            }
        }

        if (typeof process !== 'undefined' && process.env) {
            const nodeEnv = process.env.NODE_ENV;
            if (nodeEnv) {
                return nodeEnv !== 'production';
            }
        }

        return false;
    }

    /**
     * Retorna true quando estiver em ambiente de produção
     */
    static isProduction() {
        return !this.isDevelopment();
    }

    /**
     * Logger condicional (apenas em desenvolvimento)
     */
    static log(...args) {
        if (this.isDevelopment()) {
            console.log(...args);
        }
    }
}