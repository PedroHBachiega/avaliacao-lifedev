# 📚 Mini DevBlog - React + Firebase + Deploy

Este projeto é uma aplicação completa de blog para desenvolvedores, construída com React e Firebase, incluindo recursos de autenticação, gerenciamento de posts e temas claro/escuro.

## 🌟 Funcionalidades Implementadas

### Sistema Base
- ✅ Rotas principais protegidas com React Router
- ✅ Dashboard com listagem de posts
- ✅ Criação, edição e exclusão de posts
- ✅ Visualização detalhada de posts
- ✅ Estrutura de componentes e hooks personalizados

### Autenticação Avançada
- ✅ Login com email/senha
- ✅ Login com Google, Facebook, Twitter e GitHub
- ✅ Recuperação de senha
- ✅ Verificação de email
- ✅ Proteção de rotas para usuários autenticados

### Gerenciamento de Perfil
- ✅ Página de perfil do usuário
- ✅ Atualização de nome, email e foto
- ✅ Exclusão de conta com confirmação
- ✅ Verificação de email integrada

### Experiência do Usuário
- ✅ Tema claro/escuro com persistência
- ✅ Design responsivo para mobile
- ✅ Feedback visual de operações
- ✅ Navegação intuitiva e centralizada

### DevOps e Implantação
- ✅ Deploy automatizado no Firebase Hosting
- ✅ Gerenciamento seguro de variáveis de ambiente
- ✅ Configurações otimizadas para produção

## 🚀 Tecnologias Utilizadas

- **Frontend**: React.js, React Router, CSS Modules
- **Backend**: Firebase (Firestore, Authentication)
- **Deploy**: Firebase Hosting
- **Ferramentas**: Vite, Git, GitHub

## 📋 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
├── context/          # Contextos da aplicação
├── firebase/         # Configuração do Firebase
├── hooks/            # Hooks personalizados
├── pages/            # Páginas da aplicação
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Dashboard/
│   ├── Profile/      # Perfil de usuário
│   ├── CreatePost/
│   ├── EditPost/
│   ├── Post/
│   └── ResetPassword/# Recuperação de senha
└── App.jsx           # Componente principal com rotas
```

## 🔒 Segurança Implementada

- Autenticação robusta com múltiplos provedores
- Proteção de rotas para conteúdo privado
- Gerenciamento seguro de chaves API através de variáveis de ambiente
- Reautenticação para operações sensíveis (exclusão de conta)

## 📱 Responsividade

O projeto está otimizado para dispositivos móveis com um design minimalista e centralizado, garantindo uma experiência consistente em diferentes tamanhos de tela.

## 🌓 Tema Claro/Escuro

Implementação de um sistema de alternância de temas que persiste a preferência do usuário no localStorage.

## 🛠️ Como Executar Localmente

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/avaliacao-lifedev.git
   cd avaliacao-lifedev
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Preencha com suas credenciais do Firebase (siga o formato em `.env.example`)

4. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```

## 📤 Deploy

O projeto está configurado para deploy no Firebase Hosting:

1. Gere a versão de produção:
   ```
   npm run build
   ```

2. Deploy para o Firebase:
   ```
   firebase deploy --only hosting
   ```

## 🔗 Links

- [Aplicação em produção](https://avaliacaodw3.web.app)
- [Repositório no GitHub](https://github.com/seu-usuario/avaliacao-lifedev)

## 📜 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido como parte da avaliação DW3 para o curso de Desenvolvimento Web.

