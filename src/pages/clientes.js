// Página de gestão de clientes - CORRIGIDA
import { Header } from '../components/header.js';
import { Modal } from '../components/modal.js';
import { ClienteService } from '../services/clientes.js';

export class ClientesPage {
    constructor() {
        this.clientes = [];
        this.searchQuery = '';
    }

    async render() {
        return `
            ${Header.render()}
            <div class="container">
                <div class="flex flex-between mb-6">
                    <h1>Gestão de Clientes</h1>
                    <button class="btn btn-primary" id="btn-novo-cliente">
                        + Novo Cliente
                    </button>
                </div>

                <div class="card mb-6">
                    <input 
                        type="text" 
                        class="form-input" 
                        placeholder="Pesquisar por nome, telefone ou Instagram..."
                        id="search-input"
                    >
                </div>

                <div id="clientes-list"></div>
            </div>
        `;
    }

    init() {
        window.clientesPage = this;
        
        // Event listeners
        const btnNovo = document.getElementById('btn-novo-cliente');
        if (btnNovo) {
            btnNovo.addEventListener('click', () => {
                console.log('Clique no botão novo cliente');
                this.showFormModal();
            });
        }
        
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
        
        this.loadClientes();
    }

    loadClientes() {
        if (this.searchQuery) {
            this.clientes = ClienteService.search(this.searchQuery);
        } else {
            this.clientes = ClienteService.getAll();
        }
        this.renderClientes();
    }

    renderClientes() {
        const container = document.getElementById('clientes-list');
        if (!container) return;

        if (this.clientes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👤</div>
                    <h3>Nenhum cliente encontrado</h3>
                    <p>Comece adicionando seu primeiro cliente</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Instagram</th>
                            <th>Aniversário</th>
                            <th>Procedimentos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.clientes.map(cliente => this.renderClienteRow(cliente)).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        // Adicionar event listeners aos botões da tabela
        this.attachTableListeners();
    }

    attachTableListeners() {
        // Botões "Ver Detalhes"
        document.querySelectorAll('[data-action="details"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const clienteId = btn.getAttribute('data-id');
                this.showDetailsModal(clienteId);
            });
        });
        
        // Botões "Editar"
        document.querySelectorAll('[data-action="edit"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const clienteId = btn.getAttribute('data-id');
                this.showFormModal(clienteId);
            });
        });
        
        // Botões "Excluir"
        document.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const clienteId = btn.getAttribute('data-id');
                this.deleteCliente(clienteId);
            });
        });
    }

    renderClienteRow(cliente) {
        const dataNasc = cliente.dataNascimento ? new Date(cliente.dataNascimento).toLocaleDateString('pt-BR') : '-';
        const totalProcedimentos = cliente.historico ? cliente.historico.length : 0;

        return `
            <tr>
                <td data-label="Nome"><strong>${cliente.nome}</strong></td>
                <td data-label="Telefone">${this.formatPhone(cliente.telefone)}</td>
                <td data-label="Instagram">${cliente.instagram || '-'}</td>
                <td data-label="Aniversário">${dataNasc}</td>
                <td data-label="Procedimentos">${totalProcedimentos}</td>
                <td data-label="Ações" style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn btn-sm btn-outline" data-action="details" data-id="${cliente.id}">
                        Ver Detalhes
                    </button>
                    <button class="btn btn-sm btn-secondary" data-action="edit" data-id="${cliente.id}">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-outline" style="border-color: var(--danger); color: var(--danger);" data-action="delete" data-id="${cliente.id}">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    }

    handleSearch(query) {
        this.searchQuery = query;
        this.loadClientes();
    }

    showFormModal(clienteId = null) {
        const cliente = clienteId ? ClienteService.getById(clienteId) : null;
        const isEdit = !!cliente;

        const modalId = 'modal-cliente-' + Date.now();
        const modal = new Modal({
            id: modalId,
            title: isEdit ? 'Editar Cliente' : 'Novo Cliente',
            content: `
                <form id="cliente-form">
                    <div class="form-group">
                        <label class="form-label">Nome *</label>
                        <input type="text" class="form-input" name="nome" value="${cliente?.nome || ''}" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Telefone *</label>
                        <input type="tel" class="form-input" name="telefone" value="${cliente?.telefone || ''}" placeholder="(11) 99999-9999" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Instagram</label>
                        <input type="text" class="form-input" name="instagram" value="${cliente?.instagram || ''}" placeholder="@usuario">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Data de Nascimento</label>
                        <input type="date" class="form-input" name="dataNascimento" value="${cliente?.dataNascimento || ''}">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Observações</label>
                        <textarea class="form-textarea" name="observacoes">${cliente?.observacoes || ''}</textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-cancel>
                            Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                        </button>
                    </div>
                </form>
            `
        });

        modal.show();

        // Aguardar o DOM estar pronto
        setTimeout(() => {
            const form = document.getElementById('cliente-form');
            const cancelBtn = document.querySelector('[data-cancel]');
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => modal.close());
            }
            
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);

                    try {
                        if (isEdit) {
                            ClienteService.update(clienteId, data);
                            Modal.alert('Cliente atualizado com sucesso!', 'Sucesso');
                        } else {
                            ClienteService.create(data);
                            Modal.alert('Cliente cadastrado com sucesso!', 'Sucesso');
                        }

                        modal.close();
                        this.loadClientes();
                    } catch (error) {
                        Modal.alert('Erro ao salvar cliente: ' + error.message, 'Erro');
                    }
                });
            }
        }, 100);
    }

    showDetailsModal(clienteId) {
        const cliente = ClienteService.getById(clienteId);
        if (!cliente) {
            Modal.alert('Cliente não encontrado!', 'Erro');
            return;
        }

        const historico = cliente.historico || [];
        const valorTotal = historico.reduce((sum, h) => sum + (h.valor || 0), 0);

        const modalId = 'modal-details-' + Date.now();
        const modal = new Modal({
            id: modalId,
            title: cliente.nome,
            content: `
                <div class="mb-6">
                    <p><strong>Telefone:</strong> ${this.formatPhone(cliente.telefone)}</p>
                    <p><strong>Instagram:</strong> ${cliente.instagram || '-'}</p>
                    <p><strong>Aniversário:</strong> ${cliente.dataNascimento ? new Date(cliente.dataNascimento).toLocaleDateString('pt-BR') : '-'}</p>
                    ${cliente.observacoes ? `<p><strong>Observações:</strong> ${cliente.observacoes}</p>` : ''}
                </div>

                <div class="card mb-6">
                    <h4>Estatísticas</h4>
                    <p><strong>Total de Procedimentos:</strong> ${historico.length}</p>
                    <p><strong>Valor Total Gasto:</strong> ${this.formatCurrency(valorTotal)}</p>
                </div>

                <h4 class="mb-4">Histórico de Procedimentos</h4>
                ${historico.length === 0 ? '<p class="text-muted">Nenhum procedimento realizado</p>' : `
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Serviço</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${historico.sort((a, b) => new Date(b.data) - new Date(a.data)).map(h => `
                                    <tr>
                                        <td data-label="Data">${new Date(h.data).toLocaleDateString('pt-BR')}</td>
                                        <td data-label="Serviço">${h.servico}</td>
                                        <td data-label="Valor">${this.formatCurrency(h.valor)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `}

                <div class="modal-footer">
                    <button class="btn btn-primary" data-close-details>
                        Fechar
                    </button>
                </div>
            `
        });

        modal.show();

        setTimeout(() => {
            const closeBtn = document.querySelector('[data-close-details]');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => modal.close());
            }
        }, 100);
    }

    deleteCliente(clienteId) {
        const cliente = ClienteService.getById(clienteId);
        if (!cliente) return;

        Modal.confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"?`, () => {
            try {
                ClienteService.delete(clienteId);
                Modal.alert('Cliente excluído com sucesso!', 'Sucesso');
                this.loadClientes();
            } catch (error) {
                Modal.alert('Erro ao excluir cliente: ' + error.message, 'Erro');
            }
        });
    }

    formatPhone(phone) {
        if (!phone) return '-';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        return phone;
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    }
}
