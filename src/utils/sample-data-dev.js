// ⚠️ USAR APENAS EM DESENVOLVIMENTO LOCAL
// NÃO CARREGAR EM PRODUÇÃO

// Para popular dados de teste:
// 1. Abra o console do navegador (F12)
// 2. Cole este arquivo inteiro
// 3. Execute: loadSampleData()
// Para limpar: clearAllData()

function loadSampleData() {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        console.error('❌ Sample data só pode ser carregado em localhost!');
        return;
    }

    console.log('🔄 Carregando dados de exemplo...');

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
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const proximaSemana = new Date(hoje);
    proximaSemana.setDate(hoje.getDate() + 7);

    const agendamentos = [
        {
            id: 'agend1',
            clienteId: 'cliente1',
            clienteNome: 'Maria Silva',
            servico: 'Design de Sobrancelhas',
            dataHora: amanha.toISOString().slice(0, 16),
            duracao: 60,
            valor: 80,
            status: 'confirmado',
            observacoes: 'Cliente pontual',
            createdAt: new Date(hoje.getTime() - 86400000).toISOString()
        },
        {
            id: 'agend2',
            clienteId: 'cliente2',
            clienteNome: 'Ana Costa',
            servico: 'Brow Lamination',
            dataHora: proximaSemana.toISOString().slice(0, 16),
            duracao: 90,
            valor: 180,
            status: 'agendado',
            observacoes: '',
            createdAt: new Date().toISOString()
        }
    ];

    // Pagamentos de exemplo
    const pagamentos = [
        {
            id: 'pag1',
            data: '2024-01-15',
            descricao: 'Design de Sobrancelhas - Maria Silva',
            categoria: 'servico',
            tipo: 'receita',
            valor: 80,
            formaPagamento: 'pix',
            status: 'confirmado',
            clienteId: 'cliente1',
            agendamentoId: 'agend1',
            createdAt: '2024-01-15T11:00:00'
        },
        {
            id: 'pag2',
            data: '2024-01-20',
            descricao: 'Compra de produtos - Fornecedor X',
            categoria: 'material',
            tipo: 'despesa',
            valor: 250,
            formaPagamento: 'debito',
            status: 'confirmado',
            createdAt: '2024-01-20T15:30:00'
        }
    ];

    // Salvar no localStorage
    localStorage.setItem('gabriela_clientes', JSON.stringify(clientes));
    localStorage.setItem('gabriela_agendamentos', JSON.stringify(agendamentos));
    localStorage.setItem('gabriela_pagamentos', JSON.stringify(pagamentos));

    console.log('✅ Dados carregados com sucesso!');
    console.log(`📊 ${clientes.length} clientes, ${agendamentos.length} agendamentos, ${pagamentos.length} pagamentos`);
    console.log('🔄 Recarregue a página para ver os dados');
}

function clearAllData() {
    if (!confirm('⚠️ Isso vai apagar TODOS os dados. Confirma?')) {
        return;
    }

    localStorage.removeItem('gabriela_clientes');
    localStorage.removeItem('gabriela_agendamentos');
    localStorage.removeItem('gabriela_pagamentos');
    localStorage.removeItem('gabriela_auth');

    console.log('🗑️ Todos os dados foram removidos');
    console.log('🔄 Recarregue a página');
}

console.log('📦 Sample data carregado. Use:');
console.log('  loadSampleData() - para popular dados');
console.log('  clearAllData()   - para limpar tudo');
