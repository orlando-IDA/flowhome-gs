# 🏠 FlowHome

> **Global Solution - Front-End Design Engineering (FIAP)**

O **FlowHome** é uma solução digital inovadora focada no **Futuro do Trabalho**. Em um cenário onde o trabalho híbrido e remoto se torna padrão, a organização e o equilíbrio entre vida pessoal e profissional são essenciais.

---

### 🚧 Status do Projeto
✅ **Concluído**

---

### 📋 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Links Importantes](#-links)
3. [Tecnologias Utilizadas](#-%EF%B8%8F-tecnologias-utilizadas)
4. [Funcionalidades](#--funcionalidades)
5. [Estrutura de Pastas](#-estrutura-de-pastas)
6. [Como Rodar o Projeto](#-%EF%B8%8F-como-rodar-o-projeto)
7. [Endpoints da API](#-endpoints-da-api)
8. [Demonstração](#-demonstração)
9. [Autores](#-autores)
10. [Contato](#-contato)

---

### 🎯 Sobre o Projeto

Nossa plataforma oferece um gerenciamento inteligente de tarefas, categorização de atividades e colaboração em equipes, permitindo que os usuários visualizem sua produtividade e mantenham o foco no que realmente importa.

O projeto integra um front-end moderno e responsivo com uma API Java, alinhado aos ODS da ONU (Trabalho Decente e Crescimento Econômico), promovendo bem-estar e organização para trabalhadores em regimes flexíveis.

---

### 🔗 Links

Acesse o projeto e a documentação através dos links abaixo:

* **Deploy (Vercel):** `https://flowhome.vercel.app/`
* **Deploy (API Java - Render):** `https://flowhome-gs.onrender.com`
* **Repositório (GitHub Front-end):** `https://github.com/orlando-IDA/flowhome-gs`
* **Repositório (GitHub Back-end):** `https://github.com/ggabmartins/flowhome-gs`
* **Vídeo(YouTube):** `https://youtu.be/P-3SEy2urh0`

---

### 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as mais modernas tecnologias de desenvolvimento web:

* **Core:** React (com Vite) e TypeScript
* **Estilização:** TailwindCSS (Design Responsivo)
* **Roteamento:** React Router DOM
* **Gerenciamento de Estado:** React Context API (AuthProvider)
* **Integração:** Fetch API
* **Backend:** Java com Quarkus e Banco Oracle

---

### 🚀 Funcionalidades

O **FlowHome** conta com as seguintes funcionalidades principais:

1.  **Autenticação:** Login e Cadastro seguro de usuários.
2.  **Dashboard Pessoal:** Visualização de estatísticas de produtividade (tarefas concluídas, horas focadas).
3.  **Gestão de Tarefas (CRUD):** Criar, editar, listar e excluir tarefas com datas e status (Pendente, Em Andamento, Concluída).
4.  **Categorias:** Organização de tarefas por cores e tipos (ex: Trabalho, Estudos).
5.  **Equipes:** Criação de grupos de trabalho e sistema de convite via código único.

---

### 📂 Estrutura de Pastas

Abaixo, a organização do código fonte do front-end:

```bash
FLOWHOME-GS/
├── public/
│   ├── assets/          # Imagens
│   └── ...
└── src/
    ├── components/      # Componentes reutilizáveis (Header, Cards, Inputs)
    ├── context/         # Gerenciamento de estado global (AuthContext)
    ├── pages/           # Páginas da aplicação (Home, Login, Dashboard, Tarefas)
    ├── services/        # Configuração de chamadas à API (api.ts)
    ├── types/           # Tipagem do TypeScript (Interfaces de User, Task)
    ├── utils/           # Funções utilitárias e formatadores
    ├── App.tsx          # Componente raiz e Rotas
    ├── main.tsx         # Ponto de entrada da aplicação
    └── index.css        # Estilos globais e Tailwind

## ⚙️ Rodando o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/orlando-IDA/flowhome-gs.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd flowhome-gs
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5174`.

---

## 👨‍💻 Integrantes

| Nome Completo | RM | Turma |
| :--- | :---: | :---: |
| Gabriel Lourenço Martins | 562194 | 1TDSPG |
| Orlando Gonçalves | 561584 | 1TDSPG |

--- 