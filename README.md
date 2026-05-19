# River Raid Clone

Um clone em HTML e JavaScript puro inspirado em River Raid, com canvas, inimigos, combustível, explosões e sprites gerados em JavaScript.

## Como jogar

- **Enter** ou **Começar**: iniciar a partida
- **P**: pausar ou retomar o jogo
- **←** e **→**: mover o avião
- **ESPAÇO**: atirar
- **Reiniciar**: volta a partida ao estado inicial depois do game over

## Como executar

Você pode abrir o `index.html` diretamente no navegador. Como o projeto usa apenas JavaScript puro e arquivos `.js` separados por responsabilidade, não há build step nem dependências externas.

Se preferir, também pode servir a pasta com qualquer servidor estático local.

## Estrutura do projeto

- `index.html` — markup da tela, HUD, canvas e carregamento dos scripts
- `css/style.css` — estilos da interface, HUD e game over
- `js/config.js` — canvas, HUD e constantes do jogo
- `js/input.js` — leitura do teclado
- `js/utils.js` — colisão e limites do rio
- `js/sprites.js` — sprites canvas gerados em tempo de execução
- `js/river.js` — comportamento e desenho do rio
- `js/player.js` — avião do jogador
- `js/bullets.js` — tiros
- `js/effects.js` — explosões
- `js/stars.js` — fundo estrelado
- `js/enemies.js` — inimigos, colisões e pontuação
- `js/fuel.js` — pickups de combustível
- `js/game.js` — loop principal, restart e estado global da partida

## O que foi corrigido

- Inimigos e combustível agora são mantidos dentro da área válida do rio quando ele muda de largura ou posição.
- As colisões do avião ficaram mais consistentes com hitboxes levemente mais tolerantes.
- O impacto com inimigos gera explosão visual e reduz vida de forma consistente.
- O CSS foi separado em `css/style.css` para facilitar manutenção e edição visual.
- O HUD e o game over ganharam uma composição visual mais organizada.
- O jogo agora tem telas de início e pausa com controle por teclado e botão.
- Os veículos e pickups agora são renderizados a partir de sprites canvas em JS puro.
- O loop de jogo foi reorganizado para evitar reinícios duplicados.
- O código foi separado em arquivos menores para facilitar manutenção.

## Observações

- O projeto continua em **JavaScript puro**.
- Não há framework, bundler ou transpiler.
- A refatoração priorizou compatibilidade com abertura local do navegador.

## Possíveis próximos passos

- Adicionar sons e efeitos de explosão mais ricos
- Aprimorar sprites e animações
- Melhorar a geração procedural do rio e dos inimigos

## Licença

Este projeto é de código aberto, licenciado sob a MIT License, e pode ser usado, modificado e distribuído livremente. Sinta-se à vontade para contribuir ou usar o código como base para seus próprios projetos!
