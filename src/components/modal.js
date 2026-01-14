// Componente de Modal
export class Modal {
    constructor(options = {}) {
        this.id = options.id || 'modal-' + Date.now();
        this.title = options.title || '';
        this.content = options.content || '';
        this.size = options.size || 'md';
        this.onClose = options.onClose || null;
    }

    render() {
        return `
            <div id="${this.id}" class="modal-overlay" onclick="if(event.target === this) this.remove()">
                <div class="modal modal-${this.size}">
                    <div class="modal-header">
                        <h3 class="modal-title">${this.title}</h3>
                        <button class="modal-close" onclick="document.getElementById('${this.id}').remove()">✕</button>
                    </div>
                    <div class="modal-body">
                        ${this.content}
                    </div>
                </div>
            </div>
        `;
    }

    show() {
        const existing = document.getElementById(this.id);
        if (existing) existing.remove();
        
        document.body.insertAdjacentHTML('beforeend', this.render());
        
        // Adicionar listener para fechar com ESC
        const escListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
                document.removeEventListener('keydown', escListener);
            }
        };
        document.addEventListener('keydown', escListener);
    }

    close() {
        const modal = document.getElementById(this.id);
        if (modal) {
            modal.remove();
            if (this.onClose) this.onClose();
        }
    }

    static confirm(message, onConfirm) {
        const modal = new Modal({
            title: 'Confirmação',
            content: `
                <p>${message}</p>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="document.getElementById('${modal.id}').remove()">
                        Cancelar
                    </button>
                    <button class="btn btn-primary" id="confirm-btn">
                        Confirmar
                    </button>
                </div>
            `
        });
        
        modal.show();
        
        document.getElementById('confirm-btn').addEventListener('click', () => {
            onConfirm();
            modal.close();
        });
    }

    static alert(message, title = 'Aviso') {
        const modal = new Modal({
            title: title,
            content: `
                <p>${message}</p>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="document.getElementById('${modal.id}').remove()">
                        OK
                    </button>
                </div>
            `
        });
        
        modal.show();
    }
}
