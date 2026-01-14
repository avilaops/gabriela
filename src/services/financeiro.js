// Serviço de gestão financeira
import { StorageService } from './storage.js';
import { AgendaService } from './agenda.js';

export class FinanceiroService {
    static STORAGE_KEY = StorageService.KEYS.PAGAMENTOS;

    static getAll() {
        return StorageService.getAll(this.STORAGE_KEY)
            .sort((a, b) => new Date(b.data) - new Date(a.data));
    }

    static getById(id) {
        return StorageService.find(this.STORAGE_KEY, p => p.id === id);
    }

    static create(pagamentoData) {
        const pagamento = {
            clienteId: pagamentoData.clienteId,
            agendamentoId: pagamentoData.agendamentoId || null,
            data: pagamentoData.data || new Date().toISOString(),
            servico: pagamentoData.servico,
            valor: parseFloat(pagamentoData.valor),
            formaPagamento: pagamentoData.formaPagamento || 'dinheiro',
            observacoes: pagamentoData.observacoes || ''
        };
        return StorageService.add(this.STORAGE_KEY, pagamento);
    }

    static delete(id) {
        return StorageService.delete(this.STORAGE_KEY, id);
    }

    static getPorPeriodo(dataInicio, dataFim) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        
        return this.getAll().filter(pagamento => {
            const data = new Date(pagamento.data);
            return data >= inicio && data <= fim;
        });
    }

    static getPorMes(ano, mes) {
        return this.getAll().filter(pagamento => {
            const data = new Date(pagamento.data);
            return data.getFullYear() === ano && data.getMonth() === mes;
        });
    }

    static getFaturamentoMes(ano, mes) {
        const pagamentos = this.getPorMes(ano, mes);
        return pagamentos.reduce((total, p) => total + p.valor, 0);
    }

    static getFaturamentoHoje() {
        const hoje = new Date();
        const dataStr = hoje.toISOString().split('T')[0];
        
        return this.getAll()
            .filter(p => p.data.startsWith(dataStr))
            .reduce((total, p) => total + p.valor, 0);
    }

    static getTicketMedio(ano, mes) {
        const pagamentos = this.getPorMes(ano, mes);
        if (pagamentos.length === 0) return 0;
        
        const total = pagamentos.reduce((sum, p) => sum + p.valor, 0);
        return total / pagamentos.length;
    }

    static getServicosMaisVendidos(ano, mes) {
        const pagamentos = this.getPorMes(ano, mes);
        const servicos = {};
        
        pagamentos.forEach(p => {
            if (!servicos[p.servico]) {
                servicos[p.servico] = { nome: p.servico, quantidade: 0, faturamento: 0 };
            }
            servicos[p.servico].quantidade++;
            servicos[p.servico].faturamento += p.valor;
        });
        
        return Object.values(servicos)
            .sort((a, b) => b.quantidade - a.quantidade);
    }

    static getFormasPagamento(ano, mes) {
        const pagamentos = this.getPorMes(ano, mes);
        const formas = {};
        
        pagamentos.forEach(p => {
            if (!formas[p.formaPagamento]) {
                formas[p.formaPagamento] = { nome: p.formaPagamento, quantidade: 0, valor: 0 };
            }
            formas[p.formaPagamento].quantidade++;
            formas[p.formaPagamento].valor += p.valor;
        });
        
        return Object.values(formas);
    }

    static registrarPagamentoAgendamento(agendamentoId, formaPagamento) {
        const agendamento = AgendaService.getById(agendamentoId);
        if (agendamento) {
            const pagamento = this.create({
                clienteId: agendamento.clienteId,
                agendamentoId: agendamentoId,
                data: agendamento.dataHora,
                servico: agendamento.servico,
                valor: agendamento.valor,
                formaPagamento: formaPagamento
            });
            
            // Marcar agendamento como pago
            AgendaService.update(agendamentoId, { pago: true });
            
            return pagamento;
        }
        return null;
    }
}
