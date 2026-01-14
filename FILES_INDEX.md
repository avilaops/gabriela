# 📁 Índice de Arquivos - Projeto Gabriela

Guia completo de todos os arquivos do projeto e suas funções.

---

## 🏠 Raiz do Projeto

| Arquivo | Descrição | Tamanho |
|---------|-----------|---------|
| `index.html` | Página principal do sistema | ~500 bytes |
| `app.js` | Bootstrap e inicialização | ~350 bytes |
| `test.html` | Página de testes e debug | ~5.5 KB |
| `.nojekyll` | Config GitHub Pages | 0 bytes |
| `.gitignore` | Arquivos ignorados pelo Git | ~50 bytes |

---

## 📖 Documentação

| Arquivo | Propósito | Para Quem |
|---------|-----------|-----------|
| `README.md` | Documentação completa | Todos |
| `README_SIMPLE.md` | Visão geral simplificada | Visualização rápida |
| `QUICKSTART.md` | Guia de início rápido | Novos usuários |
| `GIT_COMMANDS.md` | Comandos Git e deploy | Desenvolvedores |
| `COMMANDS.md` | Comandos úteis | Desenvolvedores |
| `CONTACT_INFO.md` | Informações de contato | Referência |
| `PROJECT_SUMMARY.md` | Resumo do projeto | Stakeholders |
| `DEPLOYMENT_CHECKLIST.md` | Checklist de deploy | Deploy team |
| `ROADMAP.md` | Futuras melhorias | Planejamento |

**Total:** 9 arquivos de documentação

---

## 🎨 Assets

### `src/assets/`

| Arquivo | Função | Tamanho |
|---------|--------|---------|
| `styles.css` | Estilos globais e design system | ~14.2 KB |

**Features do CSS:**
- Variáveis CSS customizadas
- Design system completo
- Grid e Flexbox layouts
- Componentes reutilizáveis
- Responsividade mobile-first
- Animações e transições
- Utilities classes

---

## 🧩 Componentes

### `src/components/`

| Arquivo | Componente | Linhas | Funcionalidade |
|---------|-----------|--------|----------------|
| `header.js` | Header | ~40 | Navegação principal |
| `modal.js` | Modal System | ~90 | Modais e dialogs |
| `chart.js` | Gráficos | ~180 | Canvas charts (bar, line, pie) |

**Total:** 3 componentes | ~310 linhas

---

## 📄 Páginas

### `src/pages/`

| Arquivo | Página | Linhas | Funcionalidades Principais |
|---------|--------|--------|---------------------------|
| `landing.js` | Landing Page | ~250 | Hero, Serviços, Depoimentos, CTAs |
| `dashboard.js` | Dashboard CRM | ~200 | Métricas, Estatísticas, Gráficos |
| `clientes.js` | Gestão Clientes | ~280 | CRUD, Busca, Histórico |
| `agenda.js` | Sistema Agenda | ~350 | Calendário, Agendamentos, Status |
| `financeiro.js` | Controle Financeiro | ~220 | Pagamentos, Relatórios, Gráficos |

**Total:** 5 páginas | ~1.300 linhas

### Detalhamento

#### Landing Page
- Hero section com CTA
- Seção de benefícios (3 cards)
- Serviços (4 cards detalhados)
- Depoimentos (3 clientes)
- Processo (4 etapas)
- CTA final
- Footer com contatos

#### Dashboard
- 4 cards de estatísticas
- Lista próximos agendamentos
- Lista clientes recentes
- Gráfico faturamento (6 meses)
- Gráfico serviços populares
- Aniversariantes do mês

#### Clientes
- Formulário de cadastro
- Busca em tempo real
- Tabela de clientes
- Modal de detalhes
- Histórico de procedimentos
- Edição e exclusão

#### Agenda
- Calendário mensal interativo
- Visualização diária
- Criação de agendamentos
- Gestão de status
- Confirmação e conclusão
- Cancelamento com motivo

#### Financeiro
- Estatísticas mensais
- Gráfico faturamento diário
- Gráfico serviços vendidos
- Formas de pagamento
- Histórico completo
- Navegação por período

---

## ⚙️ Serviços

### `src/services/`

| Arquivo | Serviço | Linhas | Responsabilidade |
|---------|---------|--------|------------------|
| `storage.js` | Storage Service | ~100 | LocalStorage CRUD |
| `router.js` | Router SPA | ~60 | Navegação entre páginas |
| `clientes.js` | Cliente Service | ~90 | Lógica de clientes |
| `agenda.js` | Agenda Service | ~120 | Lógica de agendamentos |
| `financeiro.js` | Financeiro Service | ~140 | Lógica financeira |

**Total:** 5 serviços | ~510 linhas

### Detalhamento

#### Storage Service
- `init()` - Inicializar estruturas
- `get(key)` - Buscar dados
- `set(key, value)` - Salvar dados
- `add(key, item)` - Adicionar item
- `update(key, id, data)` - Atualizar item
- `delete(key, id)` - Deletar item
- `filter(key, predicate)` - Filtrar itens
- `export()` - Exportar backup
- `import(data)` - Importar backup

#### Router Service
- `init()` - Inicializar rotas
- `navigate(path)` - Navegar para rota
- `handleRoute()` - Processar rota
- Histórico de navegação
- Lazy loading de páginas

#### Cliente Service
- `getAll()` - Listar clientes
- `getById(id)` - Buscar por ID
- `create(data)` - Criar cliente
- `update(id, data)` - Atualizar cliente
- `delete(id)` - Deletar cliente
- `search(query)` - Buscar clientes
- `addHistorico()` - Adicionar procedimento
- `getAniversariantes()` - Aniversários do mês

#### Agenda Service
- `getAll()` - Listar agendamentos
- `getById(id)` - Buscar por ID
- `create(data)` - Criar agendamento
- `update(id, data)` - Atualizar agendamento
- `delete(id)` - Deletar agendamento
- `confirmar(id)` - Confirmar agendamento
- `concluir(id)` - Concluir agendamento
- `cancelar(id, motivo)` - Cancelar
- `getPorData(data)` - Buscar por data
- `getPorMes(ano, mes)` - Buscar por mês
- `getProximos(limit)` - Próximos agendamentos

#### Financeiro Service
- `getAll()` - Listar pagamentos
- `create(data)` - Registrar pagamento
- `getPorMes(ano, mes)` - Buscar por mês
- `getFaturamentoMes()` - Total do mês
- `getTicketMedio()` - Calcular ticket médio
- `getServicosMaisVendidos()` - Top serviços
- `getFormasPagamento()` - Distribuição pagamentos
- `registrarPagamentoAgendamento()` - Vincular

---

## 🛠️ Utilitários

### `src/utils/`

| Arquivo | Função | Linhas |
|---------|--------|--------|
| `sample-data.js` | Dados de exemplo | ~100 |

**Funcionalidades:**
- `loadSampleData()` - Carrega dados de teste
- `clearAllData()` - Limpa todos os dados
- 3 clientes exemplo
- 3 agendamentos exemplo
- 3 pagamentos exemplo

---

## 🚀 Deploy

| Arquivo | Plataforma | Função |
|---------|-----------|--------|
| `deploy.sh` | Linux/Mac | Script de deploy |
| `deploy.bat` | Windows | Script de deploy |

**Funcionalidades:**
- Commit automático
- Push para GitHub
- Mensagens padronizadas

---

## 📊 Estatísticas Gerais

### Por Tipo de Arquivo

| Tipo | Quantidade | Linhas (aprox) | Tamanho |
|------|-----------|----------------|---------|
| JavaScript | 13 | ~2.500 | ~80 KB |
| CSS | 1 | ~600 | ~14 KB |
| HTML | 2 | ~100 | ~6 KB |
| Markdown | 9 | ~2.000 | ~45 KB |
| **Total** | **25** | **~5.200** | **~145 KB** |

### Por Categoria

| Categoria | Arquivos | Função |
|-----------|----------|--------|
| Core | 5 | HTML, JS principal, config |
| Assets | 1 | Estilos |
| Componentes | 3 | UI reutilizável |
| Páginas | 5 | Views do sistema |
| Serviços | 5 | Lógica de negócio |
| Utilitários | 1 | Helpers |
| Deploy | 2 | Scripts de deploy |
| Documentação | 9 | Guias e docs |

---

## 🎯 Navegação Rápida

### Para Desenvolvedores
1. Começar: [`QUICKSTART.md`](QUICKSTART.md)
2. Comandos: [`COMMANDS.md`](COMMANDS.md)
3. Deploy: [`GIT_COMMANDS.md`](GIT_COMMANDS.md)
4. Código: `src/` (ver acima)

### Para Usuários
1. Visão geral: [`README_SIMPLE.md`](README_SIMPLE.md)
2. Manual completo: [`README.md`](README.md)
3. Contatos: [`CONTACT_INFO.md`](CONTACT_INFO.md)

### Para Gestão
1. Resumo: [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md)
2. Checklist: [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md)
3. Roadmap: [`ROADMAP.md`](ROADMAP.md)

---

## 🔍 Buscar Arquivo

### Por Funcionalidade

**Estilização:**
- `src/assets/styles.css`

**Navegação:**
- `src/services/router.js`
- `src/components/header.js`

**Dados:**
- `src/services/storage.js`
- `src/services/clientes.js`
- `src/services/agenda.js`
- `src/services/financeiro.js`

**Interface:**
- `src/components/modal.js`
- `src/components/chart.js`
- `src/pages/*.js`

**Testes:**
- `test.html`
- `src/utils/sample-data.js`

**Deploy:**
- `deploy.sh` / `deploy.bat`
- `.nojekyll`
- `.gitignore`

---

## 📦 Estrutura em Árvore

```
gabriela/
├── 📄 index.html
├── 📄 app.js
├── 📄 test.html
├── 📄 .nojekyll
├── 📄 .gitignore
├── 📄 deploy.sh
├── 📄 deploy.bat
├── 📖 README.md
├── 📖 README_SIMPLE.md
├── 📖 QUICKSTART.md
├── 📖 GIT_COMMANDS.md
├── 📖 COMMANDS.md
├── 📖 CONTACT_INFO.md
├── 📖 PROJECT_SUMMARY.md
├── 📖 DEPLOYMENT_CHECKLIST.md
├── 📖 ROADMAP.md
├── 📖 FILES_INDEX.md (este arquivo)
└── 📁 src/
    ├── 📁 assets/
    │   └── 🎨 styles.css
    ├── 📁 components/
    │   ├── 🧩 header.js
    │   ├── 🧩 modal.js
    │   └── 🧩 chart.js
    ├── 📁 pages/
    │   ├── 📄 landing.js
    │   ├── 📄 dashboard.js
    │   ├── 📄 clientes.js
    │   ├── 📄 agenda.js
    │   └── 📄 financeiro.js
    ├── 📁 services/
    │   ├── ⚙️ storage.js
    │   ├── ⚙️ router.js
    │   ├── ⚙️ clientes.js
    │   ├── ⚙️ agenda.js
    │   └── ⚙️ financeiro.js
    └── 📁 utils/
        └── 🛠️ sample-data.js
```

---

## 📞 Suporte

Dúvidas sobre arquivos?
- Email: gabrielacasari@hotmail.com
- GitHub: https://github.com/avilaops/gabriela

---

**Última atualização:** Janeiro 2024
**Total de arquivos:** 30
**Versão do projeto:** 1.0.0
