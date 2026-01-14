// Utilitário para popular dados de exemplo
// Execute no console do navegador: loadSampleData()

function loadSampleData() {
    // Clientes de exemplo
    const clientes = [
        {
            id: 'cliente1',
            nome: 'Maria Silva',
            telefone: '11987654321',
            instagram: '@maria.silva',
            dataNascimento: '1990-05-15',
            observacoes: 'Pele sensível',
            historico: [
                {
                    id: 'h1',
                    data: '2024-01-15T10:00:00',
                    servico: 'Design de Sobrancelhas',
                    valor: 80,
                    observacoes: 'Primeira vez'
                }
            ],
            createdAt: '2024-01-10T09:00:00'
        },
        {
            id: 'cliente2',
            nome: 'Ana Costa',
            telefone: '11976543210',
            instagram: '@aninha.costa',
            dataNascimento: '1995-08-22',
            observacoes: 'Micropigmentação antiga',
            historico: [],
            createdAt: '2024-01-12T14:30:00'
        },
        {
            id: 'cliente3',
            nome: 'Juliana Oliveira',
            telefone: '11965432109',
            instagram: '@ju.oliveira',
            dataNascimento: '1988-03-10',
            observacoes: '',
            historico: [],
            createdAt: '2024-01-20T11:15:00'
        }
    ];

    // Agendamentos de exemplo
    const agendamentos = [
        {
            id: 'agend1',
            clienteId: 'cliente1',
            dataHora: new Date(Date.now() + 86400000).toISOString(), // Amanhã
            servico: 'Design de Sobrancelhas',
            valor: 80,
            status: 'confirmado',
            observacoes: '',
            createdAt: new Date().toISOString()
        },
        {
            id: 'agend2',
            clienteId: 'cliente2',
            dataHora: new Date(Date.now() + 172800000).toISOString(), // Daqui 2 dias
            servico: 'Micropigmentação',
            valor: 600,
            status: 'agendado',
            observacoes: 'Cliente já fez micropigmentação antes',
            createdAt: new Date().toISOString()
        },
        {
            id: 'agend3',
            clienteId: 'cliente3',
            dataHora: new Date(Date.now() + 259200000).toISOString(), // Daqui 3 dias
            servico: 'Henna',
            valor: 60,
            status: 'agendado',
            observacoes: '',
            createdAt: new Date().toISOString()
        }
    ];

    // Pagamentos de exemplo
    const pagamentos = [
        {
            id: 'pag1',
            clienteId: 'cliente1',
            agendamentoId: null,
            data: '2024-01-15T10:00:00',
            servico: 'Design de Sobrancelhas',
            valor: 80,
            formaPagamento: 'pix',
            observacoes: '',
            createdAt: '2024-01-15T10:30:00'
        },
        {
            id: 'pag2',
            clienteId: 'cliente2',
            agendamentoId: null,
            data: '2024-01-18T14:00:00',
            servico: 'Design de Sobrancelhas',
            valor: 80,
            formaPagamento: 'dinheiro',
            observacoes: '',
            createdAt: '2024-01-18T14:30:00'
        },
        {
            id: 'pag3',
            clienteId: 'cliente3',
            agendamentoId: null,
            data: '2024-01-20T11:00:00',
            servico: 'Lifting de Cílios',
            valor: 120,
            formaPagamento: 'cartao',
            observacoes: '',
            createdAt: '2024-01-20T11:45:00'
        }
    ];

    // Salvar no LocalStorage
    localStorage.setItem('gabriela_clientes', JSON.stringify(clientes));
    localStorage.setItem('gabriela_agendamentos', JSON.stringify(agendamentos));
    localStorage.setItem('gabriela_pagamentos', JSON.stringify(pagamentos));

    console.log('✅ Dados de exemplo carregados com sucesso!');
    console.log('📊 Clientes:', clientes.length);
    console.log('📅 Agendamentos:', agendamentos.length);
    console.log('💰 Pagamentos:', pagamentos.length);
    console.log('🔄 Recarregue a página para ver os dados');
}

function clearAllData() {
    if (confirm('Tem certeza que deseja limpar TODOS os dados?')) {
        localStorage.removeItem('gabriela_clientes');
        localStorage.removeItem('gabriela_agendamentos');
        localStorage.removeItem('gabriela_pagamentos');
        console.log('🗑️ Todos os dados foram removidos');
        console.log('🔄 Recarregue a página');
    }
}

// Exportar para uso no console
window.loadSampleData = loadSampleData;
window.clearAllData = clearAllData;

console.log('💡 Utilitários disponíveis:');
console.log('   loadSampleData() - Carregar dados de exemplo');
console.log('   clearAllData() - Limpar todos os dados');
