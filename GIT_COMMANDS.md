# 📋 Comandos Git para Deploy

## Configuração Inicial (primeira vez)

```bash
# Inicializar repositório
git init

# Adicionar remote
git remote add origin https://github.com/avilaops/gabriela.git

# Configurar branch principal
git branch -M main
```

## Commit e Push

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "feat: Sistema completo de gestão para estúdio de sobrancelhas

- Landing page profissional com CTAs
- CRM completo com dashboard
- Gestão de clientes com histórico
- Sistema de agenda com calendário
- Controle financeiro com relatórios
- Design responsivo e premium
- 100% frontend estático
- Pronto para GitHub Pages"

# Enviar para GitHub
git push -u origin main
```

## Commits Futuros

```bash
# Para novas funcionalidades
git add .
git commit -m "feat: [descrição da nova funcionalidade]"
git push

# Para correções
git add .
git commit -m "fix: [descrição da correção]"
git push

# Para melhorias
git add .
git commit -m "chore: [descrição da melhoria]"
git push

# Para atualizações de estilo
git add .
git commit -m "style: [descrição da mudança visual]"
git push
```

## Ativar GitHub Pages

1. Acesse: https://github.com/avilaops/gabriela/settings/pages
2. Em "Source", selecione: **main** branch
3. Clique em **Save**
4. Aguarde processamento (2-5 minutos)
5. Acesse: https://avilaops.github.io/gabriela/

## Configurar Domínio Customizado (gabriela.avila.inc)

### No GitHub:
1. Settings → Pages → Custom domain
2. Digite: `gabriela.avila.inc`
3. Marque: **Enforce HTTPS**

### No provedor DNS:
```
Type: CNAME
Name: gabriela
Value: avilaops.github.io
TTL: 3600
```

Aguarde propagação DNS (pode levar até 48h, mas geralmente 1-2h).

## Verificar Status

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Ver remote configurado
git remote -v
```

## Atualizar Repositório Local

```bash
# Baixar mudanças do GitHub
git pull origin main
```

---

**Pronto para produção! 🚀**
