# 🚀 Guia de Início Rápido

## Primeiros Passos

### 1. Abrir o Sistema Localmente

**Opção A: Abrir diretamente no navegador**
- Simplesmente abra o arquivo `index.html` no seu navegador

**Opção B: Usar um servidor local**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

### 2. Testar com Dados de Exemplo

1. Abra o sistema no navegador
2. Pressione `F12` para abrir o Console
3. Digite: `loadSampleData()`
4. Pressione Enter
5. Recarregue a página (F5)

Pronto! Agora você tem clientes, agendamentos e pagamentos de exemplo.

### 3. Navegação do Sistema

**Landing Page (Página Inicial)**
- Acesse: `/` ou `index.html`
- Página pública com informações do estúdio
- Clique em "Acessar Sistema" para entrar no CRM

**Dashboard**
- Acesse: `/dashboard`
- Visão geral do negócio
- Estatísticas e gráficos

**Clientes**
- Acesse: `/clientes`
- Gerenciar cadastro de clientes
- Ver histórico de procedimentos

**Agenda**
- Acesse: `/agenda`
- Visualizar calendário
- Criar e gerenciar agendamentos

**Financeiro**
- Acesse: `/financeiro`
- Relatórios financeiros
- Gráficos de faturamento

## 🎨 Personalização Rápida

### Mudar Cores do Tema

Edite `src/assets/styles.css` (linhas 3-5):
```css
--primary: #D4A574;        /* Sua cor principal */
--primary-dark: #B8915F;   /* Versão mais escura */
--primary-light: #E8D4BA;  /* Versão mais clara */
```

### Mudar Informações de Contato

Edite `src/pages/landing.js`:
- WhatsApp: Procure por `5517996820993` e substitua
- Instagram: Procure por `@gabrielarincao` e substitua
- Email: Procure por `gabrielacasari@hotmail.com` e substitua

### Adicionar/Modificar Serviços

Edite `src/pages/agenda.js` (linha ~185):
```javascript
<option value="Seu Novo Serviço">Seu Novo Serviço</option>
```

## 📱 Deploy no GitHub Pages

### Passo 1: Preparar o Repositório
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/avilaops/gabriela.git
git push -u origin main
```

### Passo 2: Ativar GitHub Pages
1. Vá em https://github.com/avilaops/gabriela/settings/pages
2. Em "Source", selecione **main** branch
3. Clique em **Save**
4. Aguarde alguns minutos

### Passo 3: Acessar o Site
Seu site estará disponível em:
`https://avilaops.github.io/gabriela/`

## 🔧 Solução de Problemas

### Página em branco
- Verifique o console do navegador (F12)
- Confirme que todos os arquivos foram carregados
- Tente abrir com um servidor local

### Dados não aparecem
- Abra o Console (F12)
- Execute: `loadSampleData()`
- Recarregue a página

### Rotas não funcionam
- Se estiver usando GitHub Pages, certifique-se que o arquivo `.nojekyll` existe
- Para servidores locais, use uma solução que suporte SPA

### Limpar todos os dados
```javascript
// No console do navegador (F12)
clearAllData()
```

## 💡 Dicas Úteis

### Backup dos Dados
```javascript
// No console (F12)
const backup = localStorage.getItem('gabriela_clientes');
console.log(backup); // Copie e salve em um arquivo
```

### Restaurar Backup
```javascript
// Cole seu backup e execute:
const dados = '[seu backup aqui]';
localStorage.setItem('gabriela_clientes', dados);
location.reload();
```

### Ver Todos os Dados
```javascript
// No console (F12)
console.log('Clientes:', JSON.parse(localStorage.getItem('gabriela_clientes')));
console.log('Agendamentos:', JSON.parse(localStorage.getItem('gabriela_agendamentos')));
console.log('Pagamentos:', JSON.parse(localStorage.getItem('gabriela_pagamentos')));
```

## 📞 Suporte

Problemas? Abra uma issue no GitHub:
https://github.com/avilaops/gabriela/issues

---

**Bom uso! 💜**
