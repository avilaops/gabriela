# 🔒 Correções de Segurança P0 (Aplicadas)

**Data:** 16/01/2026  
**Status:** ✅ Bloqueadores críticos corrigidos

---

## ✅ Correções Implementadas

### 1. Credenciais Removidas do Front-end
- **Arquivo:** `src/services/auth.js`
- **Problema:** Email e senha do admin expostos no código fonte
- **Solução:** 
  - Credenciais hardcoded removidas
  - Login via front-end desabilitado
  - Preparado para integração com backend
  - Função `devLogin()` temporária para dev local apenas

### 2. Sample Data Removido da Produção
- **Arquivo:** `index.html`
- **Problema:** `sample-data.js` expunha funções perigosas (loadSampleData, clearAllData)
- **Solução:** 
  - Script removido do HTML
  - Arquivo mantido para dev manual apenas

---

## 🚨 Sistema Atual: AUTH DESABILITADO

**O login não funciona até implementar backend.**

### Para desenvolvimento local:
```javascript
// No console do navegador (apenas localhost):
window.authService = new AuthService();
window.authService.devLogin();
// Depois recarregue a página
```

---

## 📋 Próximos Passos Obrigatórios

### P1 - Backend Mínimo (URGENTE)
**Status:** 🔴 Não iniciado  
**Prazo recomendado:** 1-2 semanas

#### Criar API (.NET Minimal API recomendado)

**Endpoints necessários:**
```
POST /api/auth/login
  Body: { email, password }
  Response: { success, token, session }

GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id

GET    /api/agendamentos
POST   /api/agendamentos
PUT    /api/agendamentos/:id
DELETE /api/agendamentos/:id

GET    /api/pagamentos
POST   /api/pagamentos
PUT    /api/pagamentos/:id
```

**Banco de dados:** PostgreSQL

**Segurança mínima:**
- Senha com bcrypt/Argon2
- JWT para autenticação
- HTTPS obrigatório
- CORS configurado
- Rate limiting no login

#### Infraestrutura

**Opções rápidas:**
1. **Cloudflare Access** (proteção imediata)
   - Proteger `/login` e rotas admin
   - Autenticação via email mágico
   - Gratuito até 50 usuários

2. **Backend simples**
   - Railway / Render / Fly.io (deploy fácil)
   - PostgreSQL gratuito incluído
   - SSL automático

---

### P2 - Regras de Negócio

#### 1. Fluxo Agenda → Pagamento
**Problema atual:** Agendamento e pagamento desacoplados

**Solução:**
```javascript
// Ao concluir agendamento:
concluirAgendamento(agendamentoId) {
  // 1. Atualiza status
  agendamento.status = 'concluido';
  
  // 2. Cria pagamento automaticamente (se não existe)
  if (!existePagamento(agendamentoId)) {
    criarPagamentoPendente({
      agendamentoId,
      clienteId,
      valor,
      descricao: `${servico} - ${clienteNome}`,
      status: 'pendente'
    });
  }
}
```

#### 2. Status Unificado
```javascript
// Agendamento
status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado'

// Pagamento (novo campo)
paymentStatus: 'pendente' | 'pago' | 'cancelado'
```

#### 3. Normalizar Datas (UTC Safe)
```javascript
// Sempre usar Intl.DateTimeFormat
const formatarData = (isoString) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  }).format(new Date(isoString));
};

// Ao salvar no backend
const agora = new Date().toISOString(); // ✅ UTC no banco
// Ao exibir no front
formatarData(agora); // ✅ Localizado
```

---

## 🔐 Proteção Temporária (até backend)

### Opção 1: Cloudflare Access (RECOMENDADO)
```yaml
# Cloudflare Dashboard > Zero Trust > Access
- Name: Admin Panel
- Path: gabrielarincao.com.br/*
- Policy: Email ends with @hotmail.com
```

**Vantagens:**
- Setup em 5 minutos
- Gratuito
- Email mágico (sem senha)
- Protege TODO o site

### Opção 2: Subdomínio Admin
```
admin.gabrielarincao.com.br → protegido com Basic Auth
gabrielarincao.com.br → landing page pública
```

---

## 📊 Checklist de Produção

- [x] Credenciais hardcoded removidas
- [x] sample-data.js fora do HTML
- [ ] Backend com auth real
- [ ] PostgreSQL configurado
- [ ] Cloudflare Access ativo (temp)
- [ ] HTTPS obrigatório
- [ ] Variáveis de ambiente (.env)
- [ ] Fluxo Agenda→Pagamento fechado
- [ ] Datas timezone-safe
- [ ] XSS sanitization (DOMPurify)

---

## 🛠️ Como Continuar

1. **Agora (dev local):**
   - Use `devLogin()` no console
   - Não commite dados reais

2. **Esta semana:**
   - Decisão: Cloudflare Access ou backend próprio
   - Se backend: escolher stack (.NET / Node)

3. **Próximas 2 semanas:**
   - API + PostgreSQL rodando
   - Integração com front-end
   - Deploy protegido

---

## ⚠️ ATENÇÃO

**O site não deve ir para produção assim.**

Sem backend:
- ❌ Dados só no navegador (perdem ao limpar cache)
- ❌ Sem backup
- ❌ Sem auditoria
- ❌ Não funciona em múltiplos dispositivos
- ❌ Login desabilitado

**Prioridade 1:** Backend + PostgreSQL  
**Prioridade 2:** Proteção de acesso (Cloudflare ou similar)
