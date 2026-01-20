# 🛠️ Comandos Úteis - Desenvolvimento

Referência rápida de comandos para trabalhar com o projeto Gabriela.

---

## 🌐 Servidores Locais

### Python 3 (Recomendado)
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

### Python 2
```bash
python -m SimpleHTTPServer 8000
```

### Node.js
```bash
npx serve
# ou
npx http-server
```

### PHP
```bash
php -S localhost:8000
```

### Live Server (VS Code)
- Instale extensão "Live Server"
- Clique direito em `index.html`
- "Open with Live Server"

---

## 🔍 Debugging

### Console do Navegador
```javascript
// Abrir console: F12

// Ver dados armazenados
console.log(localStorage.getItem('gabriela_clientes'));
console.log(localStorage.getItem('gabriela_agendamentos'));
console.log(localStorage.getItem('gabriela_pagamentos'));

// Carregar dados de exemplo
loadSampleData();

// Limpar todos os dados
clearAllData();

// Exportar backup
const backup = {
    clientes: localStorage.getItem('gabriela_clientes'),
    agendamentos: localStorage.getItem('gabriela_agendamentos'),
    pagamentos: localStorage.getItem('gabriela_pagamentos')
};
console.log(JSON.stringify(backup, null, 2));

// Verificar erros
window.onerror = function(msg, url, line) {
    console.error('Erro:', msg, 'em', url, 'linha', line);
};
```

### DevTools
```bash
# Chrome DevTools
Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)

# Firefox DevTools
Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)

# Safari DevTools
Cmd+Option+I
```

---

## 🗂️ Git Commands

### Inicialização
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/avilaops/gabriela.git
git branch -M main
git push -u origin main
```

### Commits Comuns
```bash
# Nova feature
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push

# Correção de bug
git add .
git commit -m "fix: corrige erro no formulário"
git push

# Atualização de estilo
git add .
git commit -m "style: ajusta cores do tema"
git push

# Documentação
git add .
git commit -m "docs: atualiza README"
git push

# Refatoração
git add .
git commit -m "refactor: reorganiza estrutura de pastas"
git push
```

### Branches
```bash
# Criar nova branch
git checkout -b feature/nome-feature

# Mudar de branch
git checkout main

# Listar branches
git branch -a

# Deletar branch
git branch -d feature/nome-feature
```

### Histórico
```bash
# Ver commits
git log --oneline

# Ver mudanças
git diff

# Ver status
git status

# Ver remotes
git remote -v
```

---

## 🔧 Manutenção

### Limpeza
```bash
# Remover arquivos não rastreados
git clean -fd

# Resetar mudanças
git reset --hard HEAD

# Voltar commit
git reset --soft HEAD~1
```

### Atualização
```bash
# Baixar mudanças
git pull origin main

# Sincronizar
git fetch origin
git merge origin/main
```

---

## 📦 Backup e Restore

### Backup Manual (Browser Console)
```javascript
// Exportar todos os dados
function backupAll() {
    const data = {
        clientes: localStorage.getItem('gabriela_clientes'),
        agendamentos: localStorage.getItem('gabriela_agendamentos'),
        pagamentos: localStorage.getItem('gabriela_pagamentos'),
        config: localStorage.getItem('gabriela_config')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gabriela-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    console.log('✅ Backup criado!');
}

backupAll();
```

### Restaurar Backup
```javascript
// Cole o conteúdo do backup aqui
const backup = {
    clientes: '[...]',
    agendamentos: '[...]',
    pagamentos: '[...]',
    config: '[...]'
};

// Restaurar
Object.keys(backup).forEach(key => {
    const storageKey = `gabriela_${key}`;
    localStorage.setItem(storageKey, backup[key]);
});

location.reload();
console.log('✅ Backup restaurado!');
```

---

## 🧪 Testes

### Teste de Funcionalidades
```bash
# Abrir página de testes
# Acesse: http://localhost:8000/test.html

# Ou via console
window.location.href = '/test.html';
```

### Testes Manuais
```javascript
// No console (F12)

// 1. Testar criação de cliente
const cliente = {
    nome: 'Teste Cliente',
    telefone: '17999999999',
    instagram: '@teste',
    dataNascimento: '1990-01-01',
    observacoes: 'Cliente de teste'
};
// Vá em /clientes e cadastre

// 2. Testar agendamento
// Vá em /agenda e crie um agendamento

// 3. Testar busca
// Vá em /clientes e busque pelo nome

// 4. Verificar dados
console.log('Total clientes:', JSON.parse(localStorage.getItem('gabriela_clientes')).length);
console.log('Total agendamentos:', JSON.parse(localStorage.getItem('gabriela_agendamentos')).length);
```

---

## 🎨 Personalização

### Mudar Cores
```css
/* Editar src/assets/styles.css */
:root {
    --primary: #D4A574;        /* Sua cor */
    --primary-dark: #B8915F;   /* Mais escura */
    --primary-light: #E8D4BA;  /* Mais clara */
}
```

### Adicionar Fonte
```html
<!-- No index.html, dentro do <head> -->
<link href="https://fonts.googleapis.com/css2?family=Sua+Fonte&display=swap" rel="stylesheet">
```

```css
/* No styles.css */
:root {
    --font-display: 'Sua Fonte', serif;
}
```

---

## 📊 Análise

### Ver Tamanho dos Arquivos
```bash
# Linux/Mac
du -sh src/*

# Windows PowerShell
Get-ChildItem -Recurse | Measure-Object -Property Length -Sum
```

### Contar Linhas de Código
```bash
# Linux/Mac
find . -name "*.js" -o -name "*.css" -o -name "*.html" | xargs wc -l

# Windows PowerShell
(Get-ChildItem -Include *.js,*.css,*.html -Recurse | Get-Content).Length
```

---

## 🔍 Busca no Código

### Buscar Texto
```bash
# Linux/Mac
grep -r "texto" src/

# Windows PowerShell
Select-String -Path "src\*" -Pattern "texto" -Recurse
```

### Buscar e Substituir
```bash
# Linux/Mac
sed -i 's/antigo/novo/g' arquivo.js

# Windows PowerShell
(Get-Content arquivo.js) -replace 'antigo','novo' | Set-Content arquivo.js
```

---

## 🚀 Performance

### Medir Tempo de Carregamento
```javascript
// No console
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Tempo de carregamento:', pageLoadTime + 'ms');
});
```

### Verificar Tamanho
```javascript
// Tamanho do LocalStorage
let total = 0;
for(let key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
    }
}
console.log('LocalStorage:', (total / 1024).toFixed(2) + ' KB');
```

---

## 📱 Teste Mobile

### Chrome DevTools
```
F12 → Ctrl+Shift+M (Toggle Device Toolbar)
```

### Dispositivos Comuns
- iPhone 12/13: 390x844
- iPhone 12 Pro Max: 428x926
- Samsung Galaxy S21: 360x800
- iPad Air: 820x1180

### Testar em Dispositivo Real
```bash
# Descobrir IP local
# Windows
ipconfig

# Linux/Mac
ifconfig

# Acessar do celular
http://SEU_IP:8000
```

---

## 🎯 Produtividade

### VS Code Extensions
```
- Live Server
- ES6 code snippets
- Auto Rename Tag
- Prettier
- GitLens
```

### Atalhos VS Code
```
Ctrl+P       - Buscar arquivo
Ctrl+Shift+F - Buscar em todos os arquivos
Ctrl+D       - Selecionar próxima ocorrência
Alt+Shift+F  - Formatar código
Ctrl+/       - Comentar linha
```

---

## 📞 Suporte

Dúvidas sobre comandos?
- Email: gabrielacasari@hotmail.com
- GitHub Issues: https://github.com/avilaops/gabriela/issues

---

**Última atualização:** Janeiro 2024
