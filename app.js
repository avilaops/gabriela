// Bootstrap da aplicação
import { Router } from './src/services/router.js';
import { StorageService } from './src/services/storage.js';

// Inicializar serviços
StorageService.init();

// Inicializar router
const router = new Router();

// Iniciar aplicação
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});

// Tornar router global para navegação
window.navigateTo = (path) => router.navigate(path);
