// Página de agenda/calendário
import { Header } from '/src/components/header.js';
import { Modal } from '/src/components/modal.js';
import { AgendaService } from '/src/services/agenda.js';
import { ClienteService } from '/src/services/clientes.js';

export class AgendaPage {
    constructor() {
        this.currentDate = new Date();
        this.viewMode = 'month'; // month, day
        this.selectedDate = new Date();
    }

    async render() {
        return `
            ${Header.render()}
            <div class="container">
                <div class="flex flex-between mb-md">
                    <h1>Agenda</h1>
                    <button class="btn btn-primary" id="btn-novo-agendamento">
                        + Novo Agendamento
                    </button>
                </div>

                <div class="card mb-md">
                    <div class="flex flex-between mb-md">
                        <div class="flex gap-sm">
                            <button class="btn btn-sm ${this.viewMode === 'month' ? 'btn-primary' : 'btn-outline'}" id="btn-view-month">
                                Mês
                            </button>
                            <button class="btn btn-sm ${this.viewMode === 'day' ? 'btn-primary' : 'btn-outline'}" id="btn-view-day">
                                Dia
                            </button>
                        </div>
                        
                        <div class="flex gap-sm">
                            <button class="btn btn-sm btn-outline" id="btn-previous">
                                ← Anterior
                            </button>
                            <button class="btn btn-sm btn-outline" id="btn-today">
                                Hoje
                            </button>
                            <button class="btn btn-sm btn-outline" id="btn-next">
                                Próximo →
                            </button>
                        </div>
                    </div>

                    <div id="calendar-view"></div>
                </div>

                <div id="agendamentos-list"></div>
            </div>
        `;
    }

    init() {
        window.agendaPage = this;
        
        // Event listeners
        const btnNovo = document.getElementById('btn-novo-agendamento');
        if (btnNovo) btnNovo.addEventListener('click', () => this.showFormModal());
        
        const btnMonth = document.getElementById('btn-view-month');
        if (btnMonth) btnMonth.addEventListener('click', () => this.changeView('month'));
        
        const btnDay = document.getElementById('btn-view-day');
        if (btnDay) btnDay.addEventListener('click', () => this.changeView('day'));
        
        const btnPrev = document.getElementById('btn-previous');
        if (btnPrev) btnPrev.addEventListener('click', () => this.previousPeriod());
        
        const btnToday = document.getElementById('btn-today');
        if (btnToday) btnToday.addEventListener('click', () => this.today());
        
        const btnNext = document.getElementById('btn-next');
        if (btnNext) btnNext.addEventListener('click', () => this.nextPeriod());
        
        this.renderView();
    }

    changeView(mode) {
        this.viewMode = mode;
        this.renderView();
    }

    previousPeriod() {
        if (this.viewMode === 'month') {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        } else {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
        }
        this.renderView();
    }

    nextPeriod() {
        if (this.viewMode === 'month') {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        } else {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
        }
        this.renderView();
    }

    today() {
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.renderView();
    }

    renderView() {
        const container = document.getElementById('calendar-view');
        if (!container) return;

        if (this.viewMode === 'month') {
            container.innerHTML = this.renderMonthView();
        } else {
            container.innerHTML = this.renderDayView();
        }

        this.renderAgendamentos();
    }

    renderMonthView() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const monthName = this.currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        let html = `
            <div class="calendar">
                <div class="calendar-header">
                    <h3 class="calendar-title">${monthName}</h3>
                </div>
                <div class="calendar-grid">
                    ${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => 
                        `<div class="calendar-day-header">${day}</div>`
                    ).join('')}
        `;

        // Dias do mês anterior
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            html += `<div class="calendar-day other-month">${prevMonthLastDay - i}</div>`;
        }

        // Dias do mês atual
        const today = new Date();
        const agendamentos = AgendaService.getPorMes(year, month);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            const dayAgendamentos = agendamentos.filter(a => 
                new Date(a.dataHora).getDate() === day
            );
            const hasEvents = dayAgendamentos.length > 0;

            html += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
                     onclick="window.agendaPage.selectDay(${year}, ${month}, ${day})">
                    ${day}
                    ${hasEvents ? `<div style="font-size: 0.7rem; margin-top: 2px;">${dayAgendamentos.length} agend.</div>` : ''}
                </div>
            `;
        }

        // Dias do próximo mês
        const remainingDays = 42 - (startDay + daysInMonth);
        for (let i = 1; i <= remainingDays; i++) {
            html += `<div class="calendar-day other-month">${i}</div>`;
        }

        html += `</div></div>`;
        return html;
    }

    renderDayView() {
        const dateStr = this.currentDate.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });

        return `
            <div class="calendar">
                <div class="calendar-header">
                    <h3 class="calendar-title">${dateStr}</h3>
                </div>
            </div>
        `;
    }

    selectDay(year, month, day) {
        this.selectedDate = new Date(year, month, day);
        this.currentDate = new Date(year, month, day);
        this.viewMode = 'day';
        this.renderView();
    }

    renderAgendamentos() {
        const container = document.getElementById('agendamentos-list');
        if (!container) return;

        let agendamentos;
        let title;

        if (this.viewMode === 'day') {
            agendamentos = AgendaService.getPorData(this.currentDate);
            title = `Agendamentos do dia ${this.currentDate.toLocaleDateString('pt-BR')}`;
        } else {
            agendamentos = AgendaService.getPorMes(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth()
            );
            title = `Agendamentos de ${this.currentDate.toLocaleDateString('pt-BR', { month: 'long' })}`;
        }

        if (agendamentos.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <h3 class="mb-md">${title}</h3>
                    <div class="empty-state">
                        <div class="empty-state-icon">📅</div>
                        <p>Nenhum agendamento encontrado</p>
                    </div>
                </div>
            `;
            return;
        }

        agendamentos.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

        container.innerHTML = `
            <div class="card">
                <h3 class="mb-md">${title}</h3>
                <div class="grid gap-sm">
                    ${agendamentos.map(a => this.renderAgendamentoCard(a)).join('')}
                </div>
            </div>
        `;
        
        // Adicionar event listeners
        this.attachAgendamentoListeners();
    }
    
    attachAgendamentoListeners() {
        // Botões Confirmar
        document.querySelectorAll('[data-action="confirmar"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                this.confirmarAgendamento(id);
            });
        });
        
        // Botões Concluir
        document.querySelectorAll('[data-action="concluir"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                this.concluirAgendamento(id);
            });
        });
        
        // Botões Editar
        document.querySelectorAll('[data-action="editar"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                this.showFormModal(id);
            });
        });
        
        // Botões Cancelar
        document.querySelectorAll('[data-action="cancelar"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                this.cancelarAgendamento(id);
            });
        });
    }

    renderAgendamentoCard(agendamento) {
        const date = new Date(agendamento.dataHora);
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const statusColors = {
            'agendado': 'info',
            'confirmado': 'success',
            'concluido': 'success',
            'cancelado': 'danger'
        };
        const statusLabels = {
            'agendado': 'Agendado',
            'confirmado': 'Confirmado',
            'concluido': 'Concluído',
            'cancelado': 'Cancelado'
        };

        return `
            <div class="card">
                <div class="flex flex-between">
                    <div>
                        <div class="flex gap-sm mb-sm">
                            <strong style="font-size: 1.2rem;">${time}</strong>
                            <span class="badge badge-${statusColors[agendamento.status]}">${statusLabels[agendamento.status]}</span>
                        </div>
                        <p><strong>Cliente:</strong> ${agendamento.cliente?.nome || 'N/A'}</p>
                        <p><strong>Serviço:</strong> ${agendamento.servico}</p>
                        <p><strong>Valor:</strong> ${this.formatCurrency(agendamento.valor)}</p>
                        ${agendamento.observacoes ? `<p class="text-muted">${agendamento.observacoes}</p>` : ''}
                    </div>
                    <div class="flex flex-column gap-sm">
                        ${agendamento.status === 'agendado' ? `
                            <button class="btn btn-sm btn-primary" data-action="confirmar" data-id="${agendamento.id}">
                                Confirmar
                            </button>
                        ` : ''}
                        ${agendamento.status === 'confirmado' ? `
                            <button class="btn btn-sm btn-primary" data-action="concluir" data-id="${agendamento.id}">
                                Concluir
                            </button>
                        ` : ''}
                        <button class="btn btn-sm btn-outline" data-action="editar" data-id="${agendamento.id}">
                            Editar
                        </button>
                        ${agendamento.status !== 'cancelado' && agendamento.status !== 'concluido' ? `
                            <button class="btn btn-sm btn-outline" style="border-color: var(--danger); color: var(--danger);" data-action="cancelar" data-id="${agendamento.id}">
                                Cancelar
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    showFormModal(agendamentoId = null) {
        const agendamento = agendamentoId ? AgendaService.getById(agendamentoId) : null;
        const isEdit = !!agendamento;
        const clientes = ClienteService.getAll();

        const dataHora = agendamento?.dataHora 
            ? new Date(agendamento.dataHora).toISOString().slice(0, 16)
            : '';

        const modalId = 'modal-agendamento-' + Date.now();
        const modal = new Modal({
            id: modalId,
            title: isEdit ? 'Editar Agendamento' : 'Novo Agendamento',
            content: `
                <form id="agendamento-form">
                    <div class="form-group">
                        <label class="form-label">Cliente *</label>
                        <select class="form-select" name="clienteId" required>
                            <option value="">Selecione um cliente</option>
                            ${clientes.map(c => `
                                <option value="${c.id}" ${agendamento?.clienteId === c.id ? 'selected' : ''}>
                                    ${c.nome}
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Data e Hora *</label>
                        <input type="datetime-local" class="form-input" name="dataHora" value="${dataHora}" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Serviço *</label>
                        <select class="form-select" name="servico" required>
                            <option value="">Selecione um serviço</option>
                            <option value="Brow Lamination" ${agendamento?.servico === 'Brow Lamination' ? 'selected' : ''}>Brow Lamination</option>
                            <option value="Nanofios" ${agendamento?.servico === 'Nanofios' ? 'selected' : ''}>Nanofios</option>
                            <option value="Design de Sobrancelhas" ${agendamento?.servico === 'Design de Sobrancelhas' ? 'selected' : ''}>Design de Sobrancelhas</option>
                            <option value="Henna" ${agendamento?.servico === 'Henna' ? 'selected' : ''}>Henna</option>
                            <option value="Micropigmentação" ${agendamento?.servico === 'Micropigmentação' ? 'selected' : ''}>Micropigmentação</option>
                            <option value="Despigmentação" ${agendamento?.servico === 'Despigmentação' ? 'selected' : ''}>Despigmentação</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Valor *</label>
                        <input type="number" class="form-input" name="valor" value="${agendamento?.valor || ''}" step="0.01" min="0" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Observações</label>
                        <textarea class="form-textarea" name="observacoes">${agendamento?.observacoes || ''}</textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('${modalId}').remove()">
                            Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Salvar Alterações' : 'Criar Agendamento'}
                        </button>
                    </div>
                </form>
            `
        });

        modal.show();

        document.getElementById('agendamento-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            data.valor = parseFloat(data.valor);

            if (isEdit) {
                AgendaService.update(agendamentoId, data);
                Modal.alert('Agendamento atualizado com sucesso!');
            } else {
                AgendaService.create(data);
                Modal.alert('Agendamento criado com sucesso!');
            }

            modal.close();
            this.renderView();
        });
    }

    confirmarAgendamento(id) {
        AgendaService.confirmar(id);
        Modal.alert('Agendamento confirmado!');
        this.renderView();
    }

    concluirAgendamento(id) {
        AgendaService.concluir(id);
        Modal.alert('Agendamento concluído! Adicionado ao histórico do cliente.');
        this.renderView();
    }

    cancelarAgendamento(id) {
        Modal.confirm('Tem certeza que deseja cancelar este agendamento?', () => {
            AgendaService.cancelar(id);
            Modal.alert('Agendamento cancelado.');
            this.renderView();
        });
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    destroy() {
        window.agendaPage = null;
    }
}
