```
3. Desenvolvimento da biblioteca
  3.1 Objetivos
    3.1.1 Suporte a API do React (render e hooks)
    3.1.2 Uso de um módulo WebAssembly no diffing
  3.2 Ferramentas utilizadas
    3.2.1 Rust
    3.2.2 Wasmpack
    3.2.3 Webpack
  3.3 Resultado do desenvolvimento
    3.3.1 Diagrama da solução
    3.3.2 Caso de uso: aplicação TodoMVC

```

### 3. Desenvolvimento

#### 3.1 Objetivos
A biblioteca React.js é, atualmente, uma das mais utilizadas para o desenvolvimento de aplicações front-end, tendo mais de 8 milhões de downloads semanais no NPM [1]. Com um grande número de projetos utilizando-o como dependência, a expectativa é que o React seja uma ferramenta estável à longo prazo, capaz de se manter atualizada com novos padrões e tecnologias, e, ao mesmo tempo, sem "breaking changes" (mudanças na interface pública da biblioteca), o que facilitará o processo de upgrade de versão em aplicações legadas.

Tendo a tecnologia WebAssembly se mostrado vantajosa em questões de desempenho em vários casos de uso [2], imagina-se que futuramente sua possível integração na base de código do React ou de outras bibliotecas e frameworks possa ser benéfica, e ainda mais caso seu uso possa oferecer vantagens sem a necessidade de breaking changes. Atualmente a utilização de Wasm no React.js ainda não está em discussão, apesar de cogitada [3], visto que a tecnologia ainda encontra-se em seus primeiros passos.

Assim, com base em todo o contexto técnico detalhado nos capítulos anteriores, este trabalho propõe a implementação de uma biblioteca de desenvolvimento de interfaces de usuário (front-end) na linguagem JavaScript, baseada no React.js, que seja capaz de delegar as operações complexas de seu virtual DOM para um módulo WASM. Essa biblioteca pode ser considerada um protótipo de uma possĩvel futura versão do React, que em vez de implementar os mecanismos de reconciliação em JavaScript, uma linguagem dinâmica executada numa máquina virtual, o faz via WebAssembly, cujas instruções binárias podem ser capazes de atingir desempenho próximo ao nativo [4].

Apesar de ter um menor escopo de funcionalidades, limitado pelo pouco tempo disponível para o desenvolvimento desse trabalho, o protótipo aplicará os principais conceitos básicos do React, tais como o uso da API declarativa a partir de JSX (declaração de elementos com a sintaxe `<h1></h1>` ao invés de `document.createElement("h1")`); criação de componentes funcionais; e manutenção de estado por meio da função `useState` (um dos "hooks" apresentados na versão 16.8 [5]). Com essas funcionalidades, ele será capaz de entregar aplicações simples, dinâmicas e componentizadas. 

Com o término desse desenvolvimento será possível realizar uma comparação de desempenho e consumo de memória entre duas aplicações (uma delas desenvolvida a partir do protótipo desse trabalho, e a outra a partir do React.js), e com isso investigar se o uso de WebAssembly seria realmente vantajoso para o React e quais as características ou limitações são responsáveis pela conclusão.

É importante ressaltar que o React não possui, pelo menos publicamente, uma especificação técnica de implementação. Logo, a construção do protótipo foi realizada com base na análise do código-fonte do React.js (a partir de seu repositório no Github [6]) e em sua documentação oficial [7], onde se explica em alto nível como ocorre o processo de reconciliação. Além disso, outros materiais de referência técnica foram de suma importância para a conclusão do protótipo, como os blogposts "Inside Fiber: in depth overview of the new reconciliation algorithm in React", de Max Koretskyi [8] e "Build Your Own React", de Rodrigo Pombo [9], que exploram mais a fundo o funcionamento interno do React.

Para simplificar, o protótipo desenvolvido será referido como Reactron a partir da próxima seção.

### 3.2 Funcionalidades

Assim como o React, o Reactron é uma biblioteca JavaScript. Logo, deve expor métodos para declaração de elementos a partir de JSX. O código JSX abaixo exemplifica a criação de um elemento `div`:

```js
let element = <div></div>;
```

Fazendo a transpilação do código acima (já que não se trata de código JavaScript válido) por meio da ferramenta Babel, temos como resultado o seguinte código:

```js
let element = Reactron.createElement("div", null);
```

A função `createElement` faz parte da interface pública do Reactron e torna possĩvel a criação de elementos por meio de JSX. É possível aninhar vários elementos e ter estruturas mais complexas, assim como no HTML:

```js
let element = (
  <main className="app">
    <div className="topbar">
      <a className="active" href="/home">Home</a>
      <a href="/about">About us</a>
    </div>
  </main>
);
```

Funções que retornam elementos podem ser utilizados como componentes:

```js
function Link({ href, active, children }) {
  return (
    <a className={active ? "active" : ""} href={link}>
      {children}
    </a>
  );
}

function App() {
  return (
    <main className="app">
      <div className="topbar">
        <Link href="/home" active={true}>Home</Link>
        <Link href="/about" active={false}>About us</Link>
      </div>
    </main>
  );
}
```

Para renderizar os componentes na página, é necessário usar a função `render`, que informará ao Reactron que o DOM deve ser manipulado para a exibição dos elementos criados:

```js
Reactron.render(
  <App />,
  document.querySelector("body"), // inserir os elementos na tag "body"
);
```









[1] https://www.npmjs.com/package/react
[2] ?
[3] https://github.com/facebook/react/issues/7942#issuecomment-254984862
[4] 6. WebAssembly. High-Level Goals. Disponível em: https://webassembly.org/docs/
high-level-goals/. Acesso em: 15 de setembro de 2020.
[5] https://pt-br.reactjs.org/blog/2019/02/06/react-v16.8.0.html
[6] https://github.com/facebook/react/
[7] https://reactjs.org/docs/reconciliation.html
[8] https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/
[9] https://pomb.us/build-your-own-react/
