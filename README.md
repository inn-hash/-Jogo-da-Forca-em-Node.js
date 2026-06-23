

**Desenvolvido por:** Isly Nascimento Neres
**Atividade:** Exercício #08 de JavaScript  

Este é um jogo de console interativo da Forca criado puramente em JavaScript rodando sobre o ambiente estrutural do Node.js.

## 📜 Regras do Jogo
1. O jogador deve adivinhar a palavra oculta letra por letra antes de esgotar as suas tentativas.
2. Cada erro cometido adiciona uma parte do corpo do personagem na Forca ASCII. O limite máximo permitido é de **6 erros**.
3. O jogo desconsidera acentuações e diferenças entre letras maiúsculas e minúsculas.
4. **Sistema de Pontuação:** A cada vitória, o jogador acumula pontos multiplicando as tentativas que lhe restaram por 10.

## 💡 Customizações e Recursos Bônus Implementados
* **Sistema de Dicas:** Durante a rodada, o jogador pode digitar `DICA` para obter uma pista associada à palavra. Ativar a dica consome **1 tentativa** do contador de erros como penalidade.
* **Persistência de Ranking Local (JSON):** Ao terminar de jogar, o nome e a pontuação são guardados em um arquivo chamado `ranking.json`. O terminal exibirá um painel com o Top 5 melhores placares de todos os tempos.

## 🎮 Como Jogar e Executar

### Pré-requisitos
Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para execução:
1. Clone este repositório no seu computador.
2. Abra o terminal na pasta raiz do projeto.
3. Instale as dependências necessárias executando:
   ```bash
   npm install

## 🛠️ Créditos e Referências

O desenvolvimento deste projeto foi fundamentado em documentações oficiais, padrões de engenharia de software e recursos da comunidade JavaScript. Abaixo estão listadas as principais fontes utilizadas:

### 🎒 Tecnologias e Bibliotecas
* **[Node.js Runtime](https://nodejs.org/)** — Ambiente de execução JavaScript do lado do servidor, utilizado para interpretar o código do sistema via terminal.
* **[readline-sync (NPM)](https://www.npmjs.com/package/readline-sync)** — Biblioteca síncrona essencial para capturar as entradas (*inputs*) do usuário no console do Node.js de forma linear.
* **[Node.js File System (fs)](https://nodejs.org/api/fs.html)** — Módulo nativo do Node.js utilizado para ler e escrever arquivos localmente, viabilizando o sistema de persistência do ranking em formato JSON.

### 📚 Algoritmos e Manipulação de Dados
* **Normalização de Strings (Unicode Standard)** — Utilização do método nativo `.normalize("NFD")` combinado com Expressões Regulares (`/[\u0300-\u036f]/g`) para a decomposição de caracteres e remoção de acentos diacríticos (transformando letras como `Ç` ou `Ã` em `C` e `A`).
* **Manipulação de Matrizes e Objetos (ES6+)** — Uso de métodos nativos do JavaScript como `Object.keys()`, `Math.random()`, `Array.prototype.includes()` e `Array.prototype.sort()` para gerenciamento estruturado do banco de palavras e ordenação do ranking de pontuação.

### 🎨 Design e Interface
* **ASCII Art Archive** — Modelagem matemática dos caracteres de texto utilizados para desenhar a estrutura visual da forca e as partes do corpo do personagem de forma incremental a cada erro.
