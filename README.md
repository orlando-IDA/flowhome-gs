# 1. FlowHome 🏠
> **Global Solution - Front-End Design Engineering (FIAP)**

O **FlowHome** é uma solução digital inovadora focada no **Futuro do Trabalho**. Em um cenário onde o trabalho híbrido e remoto se torna padrão, a organização e o equilíbrio entre vida pessoal e profissional são essenciais.

---

## 2. Status do Projeto
✅ **Concluído** (Versão 1.0)

## 🔗 Links

Acesse o projeto e a documentação através dos links abaixo:

* **Deploy (Vercel):** https://flowhome.vercel.app/
* **Deploy (API Java - Render):** https://flowhome-gs.onrender.com
* **Repositório (GitHub Front-end):** https://github.com/orlando-IDA/flowhome-gs
* **Repositório (GitHub Back-end):** https://github.com/ggabmartins/flowhome-gs
* **Vídeo (YouTube):** https://youtu.be/P-3SEy2urh0


---

## 3. Sumário
1. [Título e Descrição](#1-flowhome-)
2. [Status do Projeto](#2-status-do-projeto)
3. [Sumário](#3-sumário)
4. [Sobre o Projeto](#4-sobre-o-projeto)
5. [Tecnologias Utilizadas](#5-tecnologias-utilizadas)
6. [Instalação](#6-instalação)
7. [Como Usar (Link da Aplicação)](#7-como-usar)
8. [Estrutura de Pastas](#8-estrutura-de-pastas)
9. [Rotas Principais](#9-rotas-principais)
10. [Autores e Créditos](#10-autores-e-créditos)
11. [Screenshots / Demonstração](#11-screenshots--demonstração)
12. [Contato](#12-contato)

---

## 4. Sobre o Projeto

Nossa plataforma oferece um gerenciamento inteligente de tarefas, categorização de atividades e colaboração em equipes. O objetivo é permitir que trabalhadores em regimes flexíveis visualizem sua produtividade e mantenham o foco (ODS 8 - Trabalho Decente e Crescimento Econômico).

**Principais Desafios Resolvidos:**
* Dificuldade de organização no Home Office.
* Separação entre tarefas pessoais e profissionais.
* Gestão de tempo e produtividade.

---

## 5. Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as mais modernas tecnologias do ecossistema JavaScript/TypeScript:

* **Front-end:** React, Vite, TypeScript.
* **Estilização:** TailwindCSS (Design Responsivo e Moderno).
* **Roteamento:** React Router DOM.
* **Estado Global:** React Context API (AuthContext).
* **Conexão API:** Fetch API.
* **Ícones:** Lucide React / React Icons.

---

## 6. Instalação

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

4.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione a URL da API:
    ```env
    VITE_API_URL=https://flowhome-gs.onrender.com
    ```

5.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

---

## 7. Como Usar

A aplicação está disponível publicamente para acesso imediato.

### 🔗 **URL da Aplicação:** https://flowhome.vercel.app

**Passo a passo:**
1.  Acesse o link acima.
2.  Crie uma conta na tela de **Cadastro**.
3.  Faça **Login** para acessar o Dashboard(utilizando e-mail e senha do cadastro).
4.  Crie uma Categoria, Crie uma tarefa, você pode editar o status da tarefa para o desejado.
5.  Crie uma equipe e caso queira testar a funcionalidade do dashboard completo crie uma nova conta utilizando o codigo de equipe gerado.

---

## 8. Estrutura de Pastas

A organização do código segue os padrões de boas práticas do React:

```bash
FLOWHOME-GS/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis (Header, Button, Input)
│   ├── context/         # Contexto de Autenticação (AuthContext)
│   ├── pages/           # Páginas (Home, Login, Register, Dashboard)
│   ├── services/     
│   ├── utils/           # Mascaras e utilização do theme
│   ├── types/           # Interfaces TypeScript
│   ├── App.tsx          # Componente Raiz
│   └── main.tsx         # Entry Point
├── .env                 # Variáveis de ambiente
└── package.json         # Dependências
```

---

## 9. Rotas Principais

Abaixo estão as rotas de navegação configuradas no Front-end:

| Rota | Descrição |
| :--- | :--- |
| `/login` | Tela de Autenticação |
| `/categorias` | Tela de Cadastro de Categorias para serem utilizadas nas tarefas |
| `/tarefas` | Gerenciamento de Tarefas (Requer Login) |
| `/` | Dashboard do site(Home) (Requer Login e criação de uma equipe.) |


---

## 10. Autores e Créditos

Este projeto foi desenvolvido como parte da avaliação "Global Solution" da FIAP.

* **Front-end Development:** Orlando Gonçalves
* **Back-end Development (API Java):** Gabriel Lourenço Martins
* **Design System:** Baseado em TailwindCSS

---

## 11. Screenshots / Demonstração

### 🎥 Vídeo Pitch
[**Clique aqui para assistir ao vídeo no YouTube**](https://youtu.be/P-3SEy2urh0)

---

## 12. Contato

| Integrante | Detalhes |
| :--- | :--- |
| ![Orlando](https://github.com/orlando-IDA.png) | **Nome:** Orlando Gonçalves<br>**RM:** 561584<br>**Turma:** 1TDSPG<br>[GitHub](https://github.com/orlando-IDA) \| [LinkedIn](https://www.linkedin.com/in/orlando-gon%C3%A7alves-de-arruda-934078236/) |
| ![Gabriel](https://github.com/ggabmartins.png) | **Nome:** Gabriel Lourenço Martins<br>**RM:** 562194<br>**Turma:** 1TDSPG<br>[GitHub](https://github.com/ggabmartins/) \| [LinkedIn](https://www.linkedin.com/in/ggabmartins/) |