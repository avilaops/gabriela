// Serviço de armazenamento usando LocalStorage
export class StorageService {
    static KEYS = {
        CLIENTES: 'gabriela_clientes',
        AGENDAMENTOS: 'gabriela_agendamentos',
        PAGAMENTOS: 'gabriela_pagamentos',
        CONFIG: 'gabriela_config'
    };

    static init() {
        // Inicializar estruturas se não existirem
        Object.values(this.KEYS).forEach(key => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify([]));
            }
        });

        // Inicializar config
        if (!localStorage.getItem(this.KEYS.CONFIG)) {
            localStorage.setItem(this.KEYS.CONFIG, JSON.stringify({
                nomeEstudio: 'Gabriela - Design de Sobrancelhas',
                whatsapp: '5517996820993',
                instagram: '@gabriela.sobrancelhas',
                email: 'gabrielacasari@hotmail.com'
            }));
        }
    }

    static get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao ler dados:', error);
            return null;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    }

    static getAll(key) {
        return this.get(key) || [];
    }

    static add(key, item) {
        const items = this.getAll(key);
        item.id = this.generateId();
        item.createdAt = new Date().toISOString();
        items.push(item);
        this.set(key, items);
        return item;
    }

    static update(key, id, updatedItem) {
        const items = this.getAll(key);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem, updatedAt: new Date().toISOString() };
            this.set(key, items);
            return items[index];
        }
        return null;
    }

    static delete(key, id) {
        const items = this.getAll(key);
        const filtered = items.filter(item => item.id !== id);
        this.set(key, filtered);
        return filtered.length < items.length;
    }

    static find(key, predicate) {
        const items = this.getAll(key);
        return items.find(predicate);
    }

    static filter(key, predicate) {
        const items = this.getAll(key);
        return items.filter(predicate);
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static clear(key) {
        if (key) {
            this.set(key, []);
        } else {
            Object.values(this.KEYS).forEach(k => this.set(k, []));
        }
    }

    static export() {
        const data = {};
        Object.entries(this.KEYS).forEach(([name, key]) => {
            data[name] = this.get(key);
        });
        return data;
    }

    static import(data) {
        Object.entries(data).forEach(([name, value]) => {
            const key = this.KEYS[name];
            if (key) {
                this.set(key, value);
            }
        });
    }
}
