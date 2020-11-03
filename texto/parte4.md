```
4. Metodologia
  4.1 GQM
    - Objetivos, questões e métricas
  4.2 Proposta de desenvolvimento
  4.3 Coleta de dados
    4.3.1 Chrome DevTools performance timeline
      - Tempo de carregamento (First Paint e First Contentful Paint)
      - Tempo de renderização e execução
      - Consumo de memória
      - Tamanho
    4.3.2 Puppeteer
    4.3.3 Casos de teste
```

## Metodologia
O presente estudo foi conduzido com base na metodologia GQM [1], que busca
estabelecer metas e elaborar questões e métricas associadas.

### GQM

A meta elaborada foi a seguinte:
*Analisar a aplicabilidade da tecnologia WebAssembly na implementação de
Virtual DOMs a fim de melhorar eficiência de aplicações web do ponto de vista
do usuário.*

As questões elaboradas e suas métricas:

**Q1**: É possível ter um bom nível de desempenho no Virtual DOM implementado em
WebAssembly frente ao React em aplicações web?
- **M1**: Tempo de carregamento
- **M2**: Tempo de renderização e execução
- **M3**: Consumo de memória
- **M4**: Tamanho da aplicação

**Q2**: Quais características da tecnologia WebAssembly impactaram
positivamente ou negativamente na eficiência de seu virtual DOM?
- **M4**: ?
- **M5**: ?


### Coleta de dados

#### Desenvolvimento do Reactron
Para que seja possível responder às questões elaboradas no GQM e cumprir sua
meta, esse trabalho propõe o desenvolvimento de um protótipo experimental de uma
biblioteca para desenvolvimento de aplicações web, baseada no React, que faça o uso de um
Virtual DOM implementado com a tecnologia WebAssembly. O protótipo desenvolvido
nesse trabalho é referido como Reactron. Dessa forma, será
possível realizar a coleta de dados a respeito do desempenho com base em uma
aplicação de teste para validar a maturidade da tecnologia WebAssembly na
construção de aplicações web mais eficientes e sua possível inclusão em futuras
versões do React.

Para realizar a coleta de dados de desempenho foi necessário elaborar uma
aplicação de teste que pudesse exemplificar cenários de manipulação do DOM
(criação, atualização e remoção de elementos). A aplicação desenvolvida foi a
TodoMVC [2], um projeto de código-aberto bastante conhecido na comunidade que é
reimplementado em cada framework existente com o objetivo de realizar
comparações entre as diferentes tecnologias e também servir como recurso de
aprendizado. TodoMVC é basicamente uma lista de afazeres, sendo
composta por um campo de texto, uma lista de itens e botões de filtragem. É
possível criar, editar, marcar itens como concluídos ou removê-los.

Para o propósito de comparação, duas versões da aplicação TodoMVC foram desenvolvidas.
A primeira versão utiliza o React (bundle de produção, versão 16.13.1) como
dependência, e a outra utilizando o Reactron, a biblioteca proposta nesse
trabalho. Ambas as versões compartilham as mesmas funcionalidades e até mesmo
grande parte do código fonte.

#### Medição de desempenho
Para realizar a coleta de dados nas aplicações de teste foi utilizada a ferramenta Puppeteer para
executar interações na aplicação de forma automatizada e o Chrome DevTools para
monitorar métricas de desempenho da aplicação durante as interações e gerar relatórios.

O Puppeteer é uma biblioteca Node.js que oferece uma API de alto nível para
controle programático de uma instância do navegador Chrome de forma *headless* (executado sem a
interface de usuário), normalmente utilizado para executar testes de interface automáticos em
ambientes de integração contínua [6]. Um script que utiliza o Puppeteer é capaz
de abrir uma página da web, simular ações de um usuário (clicar em botões,
preencher formulários, etc.), inspecionar o DOM e também acessar e controlar funcionalidades
do Chrome DevTools. O trecho de código abaixo é um exemplo do que é possível ser
feito com a API do Puppeteer:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://google.com/')
  await page.focus('input[name=q]')
  await page.keyboard.type('stack overflow')
  await page.screenshot({ path: 'search.png' })
  await browser.close()
})()
```
**Um script que interage com uma página utilizando o Puppeteer**

Chrome DevTools [3] é um conjunto de ferramentas de desenvolvimento providas pelo
navegador Chrome para auxiliar na otimização de páginas web. Na medição do
desempenho da aplicação, foi utilizado especificamente o painel de Performance,
capaz de medir o tempo gasto em várias operações e eventos de uma aplicação
forma bastante precisa e exibir informações condensadas em gráficos interativos [5]:

![Chrome DevTools Performance Timeline](../images/todomvc-timeline.png)
**Painel de performance do Chrome DevTools na aplicação de teste TodoMVC**

Os vários tipos de eventos capturados durante a gravação de uma timeline pelo Chrome
DevTools são agrupados nas seguintes categorias [4][5]:

- **Loading**: eventos responsáveis pela análise (*parsing*) do documento HTML
  para a geração da árvore do DOM, assim como também outros eventos de rede;
- **Scripting**: execução de código JavaScript e WebAssembly; alocação e
  liberação de memória; captura de eventos do DOM;
- **Rendering**: processamento do layout da página (*reflows*);
- **Painting**: coloração da página com base em recálculos de layout (*repaints*);

Além disso, também é possível extrair informações a respeito do consumo de
memória (painel *Memory*) e tamanho da aplicação (painel *Sources*). Dessa forma,
utilizando o Puppeteer para automatizar interações e Chrome DevTools para
monitorar e gerar relatórios de desempenho, é possível coletar os dados necessários para as métricas M1
(tempo de carregamento), M2 (tempo de execução renderização), M3 (consumo de memória)
e M4 (tamanho da aplicação).

#### Cenários de teste

Os cenários de teste que serão executados pelo script estão detalhados na tabela
abaixo. Cada cenário será identificado por uma letra para que seja identificado
na seção de resultados:

```
Cenário A: Abrir a aplicação
Objetivo: Medir o tempo de carregamento da página; registrar o First Paint
Variação: 50, 150 e 300 itens

Cenário B: Criação de itens
Objetivo: medir o tempo de execução e renderização durante a construção do DOM e
virtual DOM de acordo com a quantidade de itens
Variação: 50, 150 e 300 itens

Cenário C: Atualização de itens
Objetivo: medir o tempo de execução e renderização durante a atualização do DOM
e virtual DOM de acordo com a quantidade de itens

Cenário D: Filtragem de itens
Objetivo: medir o tempo de execução e renderização durante transformações no DOM
e virtual dom de acordo com a quantidade de itens
Variação: 50, 150 e 300 itens

Cenário E: Remoção de itens
Objetivo: medir o tempo de execução e renderização durante remoção de elementos no DOM
e virtual dom de acordo com a quantidade de itens
Variação: 50, 150 e 300 itens
```
#### Execução dos testes
Os cenários de teste foram executados no seguinte setup:

**Computador**
* Processador: Intel® Core™ i7-8550U CPU @ 1.80GHz × 8  
* Placa gráfica: Intel® UHD Graphics 620 (Kabylake GT2)
* Memória RAM: 8GB (DDR4?)
* Disco: 240 GB SSD PCIe
* Sistema operacional: Ubuntu 19.10 64-bit

**Navegador**
Google Chrome
Versão 85.0.4183.121 (Official Build) (64-bit)


## Referências
```
[1] GQM, Victor Basili
[2] TodoMVC http://todomvc.com/
[3] Chrome DevTools https://developers.google.com/web/tools/chrome-devtools
[4] Performance reference https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference?hl=pt-br
[5] The Performance Analysis of Web Apps based on Virtual DOM
[6] Headless Chrome https://developers.google.com/web/updates/2017/04/headless-chrome



```

