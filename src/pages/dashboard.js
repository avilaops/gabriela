// Dashboard principal do CRM
import { Header } from '/src/components/header.js';
import { Chart } from '/src/components/chart.js';
import { ClienteService } from '/src/services/clientes.js';
import { AgendaService } from '/src/services/agenda.js';
import { FinanceiroService } from '/src/services/financeiro.js';

export class DashboardPage {
    async render() {
        return `
            ${Header.render()}
            <div class="container" style="
                background: 
                    linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.99) 100%),
                    url('../background.avif');
                background-size: cover;
                background-position: center;
                background-blend-mode: overlay;
                background-attachment: fixed;
                min-height: calc(100vh - 80px);
                padding: 24px;
                border-radius: 16px;
                margin: 24px auto;
                box-shadow: var(--shadow-lg);
            ">
                <h1 class="mb-lg">Dashboard</h1>

                <div id="stats-container"></div>

                <div class="grid grid-2 mb-lg">
                    <div class="card">
                        <h3 class="mb-md">Próximos Agendamentos</h3>
                        <div id="proximos-agendamentos"></div>
                    </div>

                    <div class="card">
                        <h3 class="mb-md">Clientes Recentes</h3>
                        <div id="clientes-recentes"></div>
                    </div>
                </div>

                <div class="grid grid-2 mb-lg">
                    <div class="card">
                        <h3 class="mb-md">Faturamento Mensal (Últimos 6 meses)</h3>
                        ${Chart.createCanvas('chart-revenue', 600, 300)}
                    </div>

                    <div class="card">
                        <h3 class="mb-md">Serviços Mais Procurados</h3>
                        ${Chart.createCanvas('chart-top-services', 600, 300)}
                    </div>
                </div>

                <div class="card">
                    <h3 class="mb-md">Aniversariantes do Mês</h3>
                    <div id="aniversariantes"></div>
                </div>
            </div>
        `;
    }

    init() {
        this.renderStats();
        this.renderProximosAgendamentos();
        this.renderClientesRecentes();
        this.renderAniversariantes();
        this.renderCharts();
    }

    renderStats() {
        const container = document.getElementById('stats-container');
        if (!container) return;

        const hoje = new Date();
        const totalClientes = ClienteService.getTotalClientes();
        const faturamentoMes = FinanceiroService.getFaturamentoMes(hoje.getFullYear(), hoje.getMonth());
        const faturamentoHoje = FinanceiroService.getFaturamentoHoje();
        const agendamentosHoje = AgendaService.getHoje().length;

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total de Clientes</div>
                    <div class="stat-value">${totalClientes}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #5EAC7B 0%, #4A8B63 100%);">
                    <div class="stat-label">Faturamento do Mês</div>
                    <div class="stat-value">${this.formatCurrency(faturamentoMes)}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #3498DB 0%, #2980B9 100%);">
                    <div class="stat-label">Faturamento Hoje</div>
                    <div class="stat-value">${this.formatCurrency(faturamentoHoje)}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #F5A623 0%, #E8930E 100%);">
                    <div class="stat-label">Agendamentos Hoje</div>
                    <div class="stat-value">${agendamentosHoje}</div>
                </div>
            </div>
        `;
    }

    renderProximosAgendamentos() {
        const container = document.getElementById('proximos-agendamentos');
        if (!container) return;

        const proximos = AgendaService.getProximos(5);

        if (proximos.length === 0) {
            container.innerHTML = '<p class="text-muted">Nenhum agendamento próximo</p>';
            return;
        }

        container.innerHTML = proximos.map(agendamento => {
            const date = new Date(agendamento.dataHora);
            const dateStr = date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="flex flex-between mb-sm" style="padding: 12px; background: var(--background); border-radius: var(--radius-sm);">
                    <div>
                        <div><strong>${agendamento.cliente?.nome || 'N/A'}</strong></div>
                        <div class="text-muted" style="font-size: 0.85rem;">${agendamento.servico}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-primary"><strong>${dateStr}</strong></div>
                        <div class="text-muted" style="font-size: 0.85rem;">${this.formatCurrency(agendamento.valor)}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderClientesRecentes() {
        const container = document.getElementById('clientes-recentes');
        if (!container) return;

        const clientes = ClienteService.getClientesRecentes(5);

        if (clientes.length === 0) {
            container.innerHTML = '<p class="text-muted">Nenhum cliente cadastrado</p>';
            return;
        }

        container.innerHTML = clientes.map(cliente => {
            const date = new Date(cliente.createdAt);
            const dateStr = date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short'
            });

            return `
                <div class="flex flex-between mb-sm" style="padding: 12px; background: var(--background); border-radius: var(--radius-sm);">
                    <div>
                        <div><strong>${cliente.nome}</strong></div>
                        <div class="text-muted" style="font-size: 0.85rem;">${this.formatPhone(cliente.telefone)}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-primary">${dateStr}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAniversariantes() {
        const container = document.getElementById('aniversariantes');
        if (!container) return;

        const aniversariantes = ClienteService.getAniversariantes();

        if (aniversariantes.length === 0) {
            container.innerHTML = '<p class="text-muted">Nenhum aniversariante este mês</p>';
            return;
        }

        aniversariantes.sort((a, b) => {
            const dayA = new Date(a.dataNascimento).getDate();
            const dayB = new Date(b.dataNascimento).getDate();
            return dayA - dayB;
        });

        container.innerHTML = `
            <div class="grid grid-3">
                ${aniversariantes.map(cliente => {
                    const date = new Date(cliente.dataNascimento);
                    const dia = date.getDate();
                    const mes = date.toLocaleDateString('pt-BR', { month: 'short' });

                    return `
                        <div class="card">
                            <div style="font-size: 2rem; margin-bottom: 8px;">🎂</div>
                            <div><strong>${cliente.nome}</strong></div>
                            <div class="text-primary">${dia} de ${mes}</div>
                            <div class="text-muted" style="font-size: 0.85rem;">${this.formatPhone(cliente.telefone)}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderCharts() {
        this.renderRevenueChart();
        this.renderTopServicesChart();
    }

    renderRevenueChart() {
        const hoje = new Date();
        const data = [];
        const labels = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            const year = date.getFullYear();
            const month = date.getMonth();
            
            const faturamento = FinanceiroService.getFaturamentoMes(year, month);
            data.push(faturamento);
            
            labels.push(date.toLocaleDateString('pt-BR', { month: 'short' }));
        }

        const chart = new Chart('chart-revenue', {
            type: 'line',
            data: data,
            labels: labels
        });

        setTimeout(() => chart.render(), 100);
    }

    renderTopServicesChart() {
        const hoje = new Date();
        const servicos = FinanceiroService.getServicosMaisVendidos(hoje.getFullYear(), hoje.getMonth());
        
        if (servicos.length === 0) return;

        const data = servicos.slice(0, 5).map(s => s.quantidade);
        const labels = servicos.slice(0, 5).map(s => s.nome.length > 15 ? s.nome.substr(0, 15) + '...' : s.nome);

        const chart = new Chart('chart-top-services', {
            type: 'bar',
            data: data,
            labels: labels
        });

        setTimeout(() => chart.render(), 100);
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatPhone(phone) {
        if (!phone) return '-';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.substr(0,2)}) ${cleaned.substr(2,5)}-${cleaned.substr(7)}`;
        }
        return phone;
    }
}
