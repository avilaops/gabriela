# 🧪 Guia de Testes - Sistema Gabriela

## ⚠️ IMPORTANTE

**Use o link correto:** https://avilaops.github.io/gabriela/

**Após cada push do GitHub:**
- Aguarde 3-5 minutos antes de testar
- GitHub Pages precisa rebuildar o site
- Durante o rebuild, o site fica 404 (normal!)

---

## 📋 Checklist de Funcionalidades

### 🏠 Landing Page
- [ ] Acessar https://avilaops.github.io/gabriela/
- [ ] Verificar se o header carrega
- [ ] Menu funciona (Home, Serviços, Depoimentos)
- [ ] Botão "Acessar Sistema" leva para /dashboard
- [ ] Links WhatsApp funcionam (abre wa.me/5517996820993)
- [ ] Links Instagram funcionam (@gabrielarincao)
- [ ] Email funciona (gabrielacasari@hotmail.com)
- [ ] Design responsivo no mobile

### 📊 Dashboard
- [ ] Acessar /dashboard
- [ ] 4 cards de estatísticas aparecem
- [ ] Gráfico de faturamento carrega
- [ ] Gráfico de serviços carrega
- [ ] Lista de próximos agendamentos
- [ ] Lista de clientes recentes
- [ ] Aniversariantes do mês

### 👥 Clientes
- [ ] Acessar /clientes
- [ ] Clicar em "+ Novo Cliente"
- [ ] Modal abre corretamente
- [ ] Preencher formulário:
  - Nome: Teste Silva
  - Telefone: 17999999999
  - Instagram: @teste
  - Data Nascimento: 01/01/1990
- [ ] Clicar em "Cadastrar Cliente"
- [ ] Modal fecha
- [ ] Cliente aparece na lista
- [ ] Clicar em "Ver Detalhes" - modal abre
- [ ] Clicar em "Editar" - modal abre com dados
- [ ] Alterar nome e salvar
- [ ] Clicar em "Excluir" - pede confirmação
- [ ] Confirmar exclusão - cliente some da lista
- [ ] Buscar cliente por nome - funciona
- [ ] Buscar por telefone - funciona
- [ ] Buscar por Instagram - funciona

### 📅 Agenda
- [ ] Acessar /agenda
- [ ] Clicar em "+ Novo Agendamento"
- [ ] Modal abre
- [ ] Selecionar cliente (se houver)
- [ ] Preencher data/hora
- [ ] Selecionar serviço
- [ ] Preencher valor
- [ ] Clicar em "Cadastrar Agendamento"
- [ ] Agendamento aparece na lista
- [ ] Botão "Mês" e "Dia" alternam visualização
- [ ] Botões "Anterior" e "Próximo" navegam
- [ ] Botão "Hoje" volta para hoje
- [ ] Calendário mostra agendamentos (bolinha)
- [ ] Clicar em dia do calendário - mostra agendamentos do dia
- [ ] Botão "Confirmar" funciona
- [ ] Botão "Concluir" funciona
- [ ] Botão "Editar" abre modal
- [ ] Botão "Cancelar" pede motivo

### 💰 Financeiro
- [ ] Acessar /financeiro
- [ ] Cards de estatísticas aparecem
- [ ] Gráfico de faturamento carrega
- [ ] Gráfico de serviços carrega
- [ ] Gráfico de formas de pagamento
- [ ] Histórico de pagamentos aparece
- [ ] Botões de navegação mensal funcionam

---

## 📱 Testes Mobile

### Menu Hamburger
- [ ] Abrir site no celular
- [ ] Ícone de menu (☰) aparece
- [ ] Clicar no menu
- [ ] Menu desliza da direita
- [ ] Links funcionam
- [ ] Menu fecha ao clicar fora
- [ ] Menu fecha ao clicar em link

### Bottom Navigation (CRM)
- [ ] Acessar /dashboard no mobile
- [ ] Bottom nav aparece fixo embaixo
- [ ] 4 ícones: Dashboard, Clientes, Agenda, Financeiro
- [ ] Clicar em cada um - navega corretamente
- [ ] Ícone ativo está destacado

### Touch Targets
- [ ] Todos os botões são fáceis de clicar (48px+)
- [ ] Inputs não causam zoom no iOS
- [ ] Tabelas viram cards no mobile
- [ ] Cards são legíveis e organizados

---

## 🐛 Testes de Erro

### LocalStorage
- [ ] Abrir console (F12)
- [ ] Digitar: `localStorage.clear()`
- [ ] Recarregar página
- [ ] Sistema inicializa sem erros
- [ ] Carregar dados de exemplo: `loadSampleData()`
- [ ] Recarregar página
- [ ] Dados aparecem

### Validações
- [ ] Tentar criar cliente sem nome - mostra erro
- [ ] Tentar criar cliente sem telefone - mostra erro
- [ ] Tentar criar agendamento sem cliente - mostra erro
- [ ] Tentar criar agendamento sem data - mostra erro

### Navegação
- [ ] Clicar em "Voltar" do navegador - funciona
- [ ] Clicar em "Avançar" - funciona
- [ ] URL muda ao navegar
- [ ] Copiar URL e colar em nova aba - abre página correta

---

## 🔍 Testes de Performance

### Carregamento
- [ ] Página inicial carrega em < 3s
- [ ] Navegação entre páginas é instantânea
- [ ] Sem delay perceptível ao clicar
- [ ] Gráficos renderizam rapidamente

### Responsividade
- [ ] Testar em Chrome (desktop)
- [ ] Testar em Firefox (desktop)
- [ ] Testar em Safari (Mac/iOS)
- [ ] Testar em Chrome (Android)
- [ ] Testar em diferentes tamanhos:
  - Desktop: 1920x1080
  - Tablet: 768x1024
  - Mobile: 375x667

---

## ✅ Critérios de Sucesso

### Obrigatório
- ✅ Todos os botões funcionam
- ✅ Modais abrem e fecham
- ✅ Formulários salvam dados
- ✅ Busca funciona
- ✅ Navegação funciona
- ✅ Mobile está funcional

### Desejável
- ✅ Design está bonito
- ✅ Animações são suaves
- ✅ Não há bugs visuais
- ✅ Textos estão corretos

---

## 🚨 Problemas Conhecidos

### DNS Propagation
- gabriela.avila.inc pode levar até 48h para propagar
- Use avilaops.github.io/gabriela enquanto isso

### GitHub Pages Rebuild
- Após cada push, aguarde 3-5 minutos
- Site fica 404 durante o rebuild (normal!)

### LocalStorage
- Dados ficam no navegador local
- Limpar cache/dados = perde tudo
- Fazer backup regularmente

---

## 📞 Reportar Bugs

Se encontrar algum problema:

1. Abra o console (F12)
2. Copie os erros que aparecem
3. Tire screenshot se for visual
4. Mande por email ou WhatsApp

**Contato:**
- Email: gabrielacasari@hotmail.com
- WhatsApp: +55 17 99682-0993

---

## 🎯 Próximos Testes (Futuro)

- [ ] Testar com 100+ clientes
- [ ] Testar com 500+ agendamentos
- [ ] Testar performance com muito dados
- [ ] Testar backup/restore
- [ ] Testar em conexão lenta
- [ ] Testar modo offline (PWA)

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2024  
**Status:** Pronto para Produção ✅
