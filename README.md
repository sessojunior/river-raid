# River Raid Clone

Um clone em HTML e JavaScript puro inspirado em River Raid, com canvas, inimigos, combustível, explosões, sprites gerados em JavaScript e testes automatizados com Vitest.

## Como executar

Você ainda pode abrir o `index.html` diretamente no navegador. O projeto continua usando scripts clássicos em arquivos `.js` separados, então a experiência local via `file://` segue funcionando.

Se preferir trabalhar com um servidor estático e comandos npm:

- `npm install` — instala as dependências de desenvolvimento
- `npm run dev` — sobe a pasta com `npx serve .`
- `npm test` — executa a suíte de testes com Vitest
- `npm run test:watch` — executa Vitest em modo watch

## Como rodar os testes

Se quiser ir direto ao ponto, o fluxo é este:

1. `npm install`
2. `npm test`

Para iterar durante o desenvolvimento:

- `npm run test:watch`

## Controles

- **←** e **→**: movimentam o avião
- **ESPAÇO**: atira
- **Reiniciar**: volta a partida ao estado inicial depois do game over

## Arquitetura

O jogo foi dividido em uma camada de estado, uma camada de lógica pura e módulos de renderização/comportamento. A ideia é manter o browser simples e deixar a matemática testável no Vitest.

### Camada de estado e fluxo

- `js/config.js` centraliza referências de DOM, canvas e constantes de jogo
- `js/input.js` mantém o estado do teclado
- `js/game.js` coordena o loop principal, o `running` state, o restart e a atualização do HUD

### Camada de lógica pura

Esses arquivos são os melhores candidatos para testes unitários porque não dependem de canvas nem de DOM:

- `js/collision.js` — caixas de colisão, interseção, clamp no rio e cálculo de spawn dentro dos limites
- `js/spawn.js` — fábricas puras para spawn de inimigos, combustível e ondas de inimigos
- `js/score.js` — helpers puros para incrementar, avançar e formatar pontuação
- `js/river-logic.js` — cálculo de largura, centro, limites e easing do rio
- `js/difficulty-logic.js` — curvas de dificuldade para spawn, largura e frequência procedural
- `js/collision-responses.js` — respostas puras para colisões entre jogador, inimigos, tiros e combustível

### Camada de renderização e comportamento

- `js/sprites.js` — sprites canvas gerados em tempo de execução
- `js/river.js` — estado do rio, update do movimento e desenho
- `js/player.js` — avião do jogador
- `js/bullets.js` — tiros
- `js/effects.js` — explosões
- `js/stars.js` — fundo estrelado
- `js/enemies.js` — inimigos, colisões, pontuação e spawn procedural
- `js/fuel.js` — pickups de combustível e spawn balanceado

## Fluxo do game loop

1. `gameLoop()` é agendado com `requestAnimationFrame()`.
2. `update()` avança a simulação quando o jogo está ativo.
3. A ordem de atualização segue a lógica do jogo:
   - rio
   - jogador
   - tiros
   - inimigos
   - combustível
   - explosões
   - estrelas
4. `draw()` limpa o canvas e renderiza o fundo, o rio, os objetos e o jogador.
5. `updateHud()` sincroniza os valores numéricos com o DOM após cada frame.
6. `gameOver()` interrompe o loop ao fim da partida; `restartGame()` reseta o estado global e religa a simulação.

## Testes automatizados

A suíte usa Vitest e cobre a camada de lógica pura.

### Arquivos testados

- `tests/collision.test.js`
- `tests/spawn.test.js`
- `tests/score.test.js`
- `tests/river-logic.test.js`
- `tests/difficulty-logic.test.js`
- `tests/collision-responses.test.js`

### O que os testes validam

- cálculo de caixas de colisão
- detecção de interseção com buffer
- clamp e spawn dentro dos limites do rio
- criação determinística de inimigos e combustível
- operações de pontuação e formatação para o HUD
- geração do centro e largura do rio com limites consistentes
- curvas de dificuldade para spawn e largura procedural
- respostas puras para colisões e ajuste de valores como vida e combustível

### Como rodar

- `npm test`

Se quiser acompanhar os testes em modo interativo:

- `npm run test:watch`

## Estrutura do projeto

- `index.html` — markup da tela, HUD, overlays e carregamento dos scripts
- `css/style.css` — estilos da interface, HUD e overlays de estado
- `js/config.js` — canvas, HUD, constantes e estados globais
- `js/input.js` — leitura do teclado
- `js/collision.js` — helpers puros de colisão e limites do rio
- `js/spawn.js` — helpers puros de spawn
- `js/score.js` — helpers puros de pontuação
- `js/river-logic.js` — helpers puros do rio procedural
- `js/difficulty-logic.js` — helpers puros de progressão e spawn balanceado
- `js/collision-responses.js` — helpers puros de resultado de colisões
- `js/sprites.js` — sprites canvas gerados em tempo de execução
- `js/river.js` — comportamento e desenho do rio
- `js/player.js` — avião do jogador
- `js/bullets.js` — tiros
- `js/effects.js` — explosões
- `js/stars.js` — fundo estrelado
- `js/enemies.js` — inimigos, colisões e pontuação
- `js/fuel.js` — pickups de combustível
- `js/game.js` — loop principal, restart e estado global da partida

## Observações

- O projeto continua em **JavaScript puro**.
- Não há framework, bundler ou transpiler.
- A compatibilidade com abertura local do navegador foi mantida.
- Os helpers de lógica foram separados para melhorar testabilidade sem exigir uma arquitetura de build complexa.
