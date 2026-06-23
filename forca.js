const readline = require("readline-sync");
const fs = require("fs");

const ARQUIVO_RANKING = "ranking.json";
const MAX_ERROS = 6;

const categorias = {
    Tecnologia: [
        { palavra: "JAVASCRIPT", dica: "Linguagem usada na web" },
        { palavra: "PYTHON", dica: "Linguagem muito usada em IA" },
        { palavra: "ALGORITMO", dica: "Sequência de passos para resolver um problema" },
        { palavra: "COMPUTADOR", dica: "Máquina de processamento de dados" },
        { palavra: "SERVIDOR", dica: "Fornece serviços em rede" },
        { palavra: "INTERNET", dica: "Rede mundial de computadores" },
        { palavra: "BANCODEDADOS", dica: "Armazena informações" }
    ],

    Animais: [
        { palavra: "CACHORRO", dica: "Melhor amigo do homem" },
        { palavra: "GATO", dica: "Animal doméstico independente" },
        { palavra: "ELEFANTE", dica: "Maior mamífero terrestre" },
        { palavra: "TIGRE", dica: "Felino listrado" },
        { palavra: "GIRAFA", dica: "Possui pescoço longo" },
        { palavra: "COELHO", dica: "Gosta de cenoura" },
        { palavra: "MACACO", dica: "Primate muito conhecido" }
    ],

    Frutas: [
        { palavra: "BANANA", dica: "Fruta amarela" },
        { palavra: "MANGA", dica: "Muito comum no Brasil" },
        { palavra: "ABACAXI", dica: "Possui coroa" },
        { palavra: "GOIABA", dica: "Pode ser vermelha por dentro" },
        { palavra: "LARANJA", dica: "Fonte de vitamina C" },
        { palavra: "MORANGO", dica: "Pequena e vermelha" },
        { palavra: "MELANCIA", dica: "Grande e cheia de água" }
    ]
};

const forca = [
` 
 +---+
 |   |
     |
     |
     |
     |
=========`,

`
 +---+
 |   |
 O   |
     |
     |
     |
=========`,

`
 +---+
 |   |
 O   |
 |   |
     |
     |
=========`,

`
 +---+
 |   |
 O   |
/|   |
     |
     |
=========`,

`
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=========`,

`
 +---+
 |   |
 O   |
/|\\  |
/    |
     |
=========`,

`
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=========`
];

function escolherCategoria() {
    const nomes = Object.keys(categorias);

    console.log("\nCategorias:");
    nomes.forEach((cat, i) => {
        console.log(`${i + 1} - ${cat}`);
    });

    let opcao;

    do {
        opcao = parseInt(
            readline.question("\nEscolha uma categoria: ")
        );
    } while (opcao < 1 || opcao > nomes.length);

    return nomes[opcao - 1];
}

function escolherPalavra(categoria) {
    const lista = categorias[categoria];
    return lista[Math.floor(Math.random() * lista.length)];
}

function mostrarPalavra(palavra, letrasCorretas) {
    let resultado = "";

    for (const letra of palavra) {
        if (letrasCorretas.includes(letra)) {
            resultado += letra + " ";
        } else {
            resultado += "_ ";
        }
    }

    return resultado;
}

function venceu(palavra, letrasCorretas) {
    for (const letra of palavra) {
        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

function carregarRanking() {
    if (!fs.existsSync(ARQUIVO_RANKING)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(ARQUIVO_RANKING));
}

function salvarRanking(nome, pontuacao) {
    let ranking = carregarRanking();

    ranking.push({
        nome,
        pontuacao
    });

    ranking.sort((a, b) => b.pontuacao - a.pontuacao);

    fs.writeFileSync(
        ARQUIVO_RANKING,
        JSON.stringify(ranking, null, 4)
    );
}

function mostrarRanking() {
    const ranking = carregarRanking();

    if (ranking.length === 0) {
        return;
    }

    console.log("\n===== RANKING =====");

    ranking.slice(0, 10).forEach((jogador, i) => {
        console.log(
            `${i + 1}º ${jogador.nome} - ${jogador.pontuacao} pts`
        );
    });
}

function jogar() {
    console.clear();
    console.log("===== JOGO DA FORCA =====");

    const nome = readline.question("\nDigite seu nome: ");

    const categoria = escolherCategoria();

    const sorteio = escolherPalavra(categoria);

    const palavra = sorteio.palavra;
    const dica = sorteio.dica;

    let letrasCorretas = [];
    let letrasTentadas = [];
    let erros = 0;
    let pontuacao = 100;
    let dicaUsada = false;

    while (erros < MAX_ERROS) {
        console.clear();

        console.log("===== JOGO DA FORCA =====");
        console.log(`Jogador: ${nome}`);
        console.log(`Categoria: ${categoria}\n`);

        console.log(forca[erros]);

        console.log(
            "\nPalavra: " +
            mostrarPalavra(palavra, letrasCorretas)
        );

        console.log(
            "\nLetras tentadas: " +
            (letrasTentadas.length
                ? letrasTentadas.join(", ")
                : "Nenhuma")
        );

        console.log(
            `\nErros restantes: ${MAX_ERROS - erros}`
        );

        console.log(`Pontuação: ${pontuacao}`);

        const entrada = readline
            .question(
                "\nDigite uma letra ou 'DICA': "
            )
            .toUpperCase();

        if (entrada === "DICA") {
            if (!dicaUsada) {
                console.log(`\nDica: ${dica}`);
                pontuacao -= 10;
                dicaUsada = true;
                readline.question("\nPressione ENTER...");
            } else {
                console.log("\nVocê já usou a dica.");
                readline.question("\nPressione ENTER...");
            }
            continue;
        }

        if (!/^[A-Z]$/.test(entrada)) {
            console.log("\nDigite apenas uma letra.");
            readline.question("\nPressione ENTER...");
            continue;
        }

        if (letrasTentadas.includes(entrada)) {
            console.log("\nLetra já utilizada.");
            readline.question("\nPressione ENTER...");
            continue;
        }

        letrasTentadas.push(entrada);

        if (palavra.includes(entrada)) {
            letrasCorretas.push(entrada);
            pontuacao += 5;
        } else {
            erros++;
            pontuacao -= 5;
        }

        if (venceu(palavra, letrasCorretas)) {
            console.clear();

            console.log("🎉 PARABÉNS!");
            console.log(`\nJogador: ${nome}`);
            console.log("Resultado: Vitória");
            console.log(`Palavra: ${palavra}`);
            console.log(`Pontuação: ${pontuacao}`);

            salvarRanking(nome, pontuacao);
            mostrarRanking();
            return;
        }
    }

    console.clear();

    console.log(forca[MAX_ERROS]);

    console.log("\n😢 VOCÊ PERDEU!");
    console.log(`Jogador: ${nome}`);
    console.log(`Palavra correta: ${palavra}`);
    console.log(`Pontuação: ${pontuacao}`);

    salvarRanking(nome, pontuacao);
    mostrarRanking();
}

while (true) {
    jogar();

    const resposta = readline
        .question("\nDeseja jogar novamente? (S/N): ")
        .toUpperCase();

    if (resposta !== "S") {
        console.log("\nObrigado por jogar!");
        break;
    }
}