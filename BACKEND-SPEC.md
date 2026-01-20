# Backend API - Especificação Técnica
## Gabriela Rincão - Sistema de Gestão

**Data:** 16/01/2026  
**Stack recomendada:** .NET 8 Minimal API + PostgreSQL  
**Alternativa:** Node.js + Express + PostgreSQL

---

## 🎯 Objetivo

Substituir localStorage por persistência real com autenticação segura.

---

## 🏗️ Arquitetura

```
gabrielarincao.com.br (front-end estático)
    ↓ HTTPS
api.gabrielarincao.com.br (backend)
    ↓
PostgreSQL (Railway/Render/Supabase)
```

---

## 🔐 Autenticação

### Endpoint: `POST /api/auth/login`

**Request:**
```json
{
  "email": "gabrielacasari@hotmail.com",
  "password": "hash_bcrypt_aqui"
}
```

**Response (sucesso):**
```json
{
  "success": true,
  "token": "jwt_token_aqui",
  "session": {
    "email": "gabrielacasari@hotmail.com",
    "nome": "Gabriela Rincão",
    "role": "admin",
    "loginAt": "2024-01-16T12:00:00Z"
  }
}
```

**Response (erro):**
```json
{
  "success": false,
  "error": "Email ou senha incorretos"
}
```

**Segurança:**
- Senha com bcrypt (cost 12)
- JWT com expiração (24h)
- Rate limit: 5 tentativas/minuto por IP
- HTTPS obrigatório

---

## 📊 Modelos de Dados

### Cliente
```typescript
interface Cliente {
  id: string;              // UUID
  nome: string;            // required
  telefone: string;        // required
  instagram?: string;
  dataNascimento?: string; // ISO 8601
  observacoes?: string;
  createdAt: string;       // timestamp UTC
  updatedAt: string;       // timestamp UTC
}
```

### Agendamento
```typescript
interface Agendamento {
  id: string;
  clienteId: string;       // FK → clientes
  clienteNome: string;     // denormalizado para performance
  servico: string;
  dataHora: string;        // ISO 8601 com timezone
  duracao: number;         // minutos
  valor: number;
  status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Pagamento
```typescript
interface Pagamento {
  id: string;
  data: string;            // ISO 8601 date
  descricao: string;
  categoria: 'servico' | 'material' | 'outro';
  tipo: 'receita' | 'despesa';
  valor: number;
  formaPagamento: 'dinheiro' | 'pix' | 'credito' | 'debito';
  status: 'pendente' | 'confirmado' | 'cancelado';
  clienteId?: string;      // FK opcional
  agendamentoId?: string;  // FK opcional
  createdAt: string;
  updatedAt: string;
}
```

---

## 🛣️ Endpoints

Todos os endpoints (exceto `/auth/login`) exigem header:
```
Authorization: Bearer {jwt_token}
```

### Clientes

```http
GET    /api/clientes
POST   /api/clientes
GET    /api/clientes/:id
PUT    /api/clientes/:id
DELETE /api/clientes/:id
```

**Exemplo GET /api/clientes?page=1&limit=50:**
```json
{
  "data": [...clientes],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3
  }
}
```

### Agendamentos

```http
GET    /api/agendamentos?data=2024-01-16
GET    /api/agendamentos?clienteId=abc123
GET    /api/agendamentos?status=confirmado
POST   /api/agendamentos
PUT    /api/agendamentos/:id
DELETE /api/agendamentos/:id
```

**Regra de negócio importante:**
- Ao mudar status para `concluido`, criar pagamento pendente automaticamente se não existir

### Pagamentos

```http
GET    /api/pagamentos?inicio=2024-01-01&fim=2024-01-31
GET    /api/pagamentos?tipo=receita
GET    /api/pagamentos?status=pendente
POST   /api/pagamentos
PUT    /api/pagamentos/:id
DELETE /api/pagamentos/:id
GET    /api/pagamentos/resumo?mes=2024-01
```

**Exemplo GET /api/pagamentos/resumo:**
```json
{
  "periodo": "2024-01",
  "totalReceitas": 5420.00,
  "totalDespesas": 1230.00,
  "saldo": 4190.00,
  "porCategoria": {
    "servico": 5420.00,
    "material": 800.00,
    "outro": 430.00
  }
}
```

---

## 🗄️ Schema PostgreSQL

```sql
-- Tabela de usuários (admin único por enquanto)
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  instagram VARCHAR(100),
  data_nascimento DATE,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_clientes_nome ON clientes(nome);
CREATE INDEX idx_clientes_telefone ON clientes(telefone);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  cliente_nome VARCHAR(255) NOT NULL, -- denormalizado
  servico VARCHAR(255) NOT NULL,
  data_hora TIMESTAMP WITH TIME ZONE NOT NULL,
  duracao INTEGER NOT NULL, -- minutos
  valor DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'agendado',
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agendamentos_data ON agendamentos(data_hora);
CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data DATE NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  forma_pagamento VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmado',
  cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL,
  agendamento_id UUID REFERENCES agendamentos(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pagamentos_data ON pagamentos(data);
CREATE INDEX idx_pagamentos_tipo ON pagamentos(tipo);
CREATE INDEX idx_pagamentos_status ON pagamentos(status);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER clientes_updated_at BEFORE UPDATE ON clientes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER agendamentos_updated_at BEFORE UPDATE ON agendamentos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER pagamentos_updated_at BEFORE UPDATE ON pagamentos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed admin (senha: gerar hash bcrypt)
INSERT INTO usuarios (email, password_hash, nome, role)
VALUES (
  'gabrielacasari@hotmail.com',
  '$2a$12$...hash_bcrypt_aqui',
  'Gabriela Rincão',
  'admin'
);
```

---

## 🚀 Deploy Rápido

### Opção 1: Railway.app (RECOMENDADO)
```bash
# 1. Criar conta no Railway
# 2. Conectar GitHub repo
# 3. Adicionar PostgreSQL (gratuito)
# 4. Configurar variáveis:
DATABASE_URL=postgresql://...
JWT_SECRET=chave_secreta_forte_aqui
CORS_ORIGIN=https://gabrielarincao.com.br
```

### Opção 2: Render.com
```bash
# Similar ao Railway
# PostgreSQL gratuito incluído
# SSL automático
```

### Opção 3: Fly.io
```bash
fly launch
fly postgres create
fly secrets set JWT_SECRET=...
fly deploy
```

---

## 🔧 Integração com Front-end

### Atualizar `src/services/auth.js`:
```javascript
async login(email, password) {
  const response = await fetch(`${this.apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem(this.storageKey, JSON.stringify({
      ...data.session,
      token: data.token
    }));
  }
  return data;
}
```

### Atualizar services (clientes, agenda, financeiro):
```javascript
async getHeaders() {
  const session = JSON.parse(localStorage.getItem('gabriela_auth'));
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.token}`
  };
}

async listar() {
  const response = await fetch(`${this.apiUrl}/clientes`, {
    headers: await this.getHeaders()
  });
  return response.json();
}
```

---

## ⚡ Prioridade de Implementação

1. **Semana 1:**
   - Setup PostgreSQL
   - Endpoint `/auth/login`
   - CRUD clientes

2. **Semana 2:**
   - CRUD agendamentos
   - CRUD pagamentos
   - Deploy Railway/Render

3. **Semana 3:**
   - Integração front-end
   - Testes E2E
   - Produção

---

## 📞 Contato

Qualquer dúvida técnica, consulte o arquivo `SECURITY-FIXES.md`.
