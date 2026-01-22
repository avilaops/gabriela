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
     * Logger condicional (apenas em desenvolvimento)
     */
    static log(...args) {
        // Verificar se estamos em desenvolvimento
        const isDevelopment = (
            // Verificar se process existe (Node.js) e NODE_ENV é development
            (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') ||
            // Ou se estamos em localhost
            (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost') ||
            // Ou se estamos em 127.0.0.1
            (typeof window !== 'undefined' && window.location && window.location.hostname === '127.0.0.1')
        );

        if (isDevelopment) {
            console.log(...args);
        }
    }
}