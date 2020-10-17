
2.1 Panorama do desenvolvimento web
  - História da Web (primeiros anos)
  - Arquitetura client side (HTTP, HTML, CSS)
  - Browser, DOM e renderização
  - Surgimento do JavaScript
  - Aplicações web hoje, frameworks


### História da Web
A World Wide Web foi criada em 1989 por Tim Berners-Lee [1], na época um
cientista da computação na CERN, com o objetivo de agregar e compartilhar
informações antes que fossem perdidas [2][3]. A proposta era criar uma "teia" de
documentos relacionados por ligações (hiperlinks) e que pudessem ser
visualizados por navegadores (browsers) [1]. Tecnologias emergentes, como redes
de computadores e seus protocolos de comunicação, e o já existente conceito de
"hipertexto", foram unidas para construir a teia descentralizada de sistemas de
informação que contava com participações de universidades e institutos de
pesquisa espalhados pelo mundo [1]. Nessa época foram fundadas as tecnologias
que permanecem como as bases das aplicações de hoje em dia: o protocolo HTTP
(HyperText Transfer Protocol), que permitiu a recuperação de recursos de
hipertexto conectados por links; o HTML (HyperText Markup Language), a linguagem
de formatação dos documentos de hipertexto; e os URI (Uniform Resource
Identifier), endereços que identificam unicamente cada recurso na web [2][6].

A Web funciona a partir da comunicação entre um servidor e um cliente feita
através do protocolo HTTP [5]. Normalmente, o cliente é um navegador: um
software que implementa o protocolo HTTP, capaz de se comunicar com servidores,
requisitando e exibindo páginas da web ao usuário. O servidor é responsável por
responder requisições de clientes e servir essas páginas [5]. No início, páginas
web normalmente eram simples e estáticas, formadas apenas por documentos HTML, o
componente mais básico da web, apesar de não ser considerada uma linguagem de
programação [6]. Com o uso de HTML era possível formatar textos, inserir imagens
e criar links para outras páginas. Quando clicado, um link faz o navegador
abandonar a página atual e carregar a página destino. Também havia o CSS, um
padrão W3C desde 1996 que permitia a customização da aparência da página [3]
quando utilizado em conjunto com o HTML.

Com o passar dos tempos e com a evolução dos navegadores, páginas web passaram a
se tornar cada vez mais complexas, principalmente após a criação do JavaScript
por Brendan Eich em 1995 [6]. Basicamente, um código JavaScript atrelado um
documento HTML permitia que a página tivesse seu conteúdo modificado sem a
necessidade de uma requisição ao servidor ou carregamento de uma nova página
[6]. Esse era o nascimento das técnicas de DHTML (Dynamic HTML), que na prática
se tratava de manipular, por meio do JavaScript, uma estrutura de dados
gerenciada pelo navegador chamada de Document Object Model (DOM).
De acordo com a World Wide Web Consortium [10], é uma interface que permite o
acesso e atualização de conteúdo, estrutura e estilos de documentos HTML, e
garante que as alterações realizadas sejam incorporadas de volta à página.

Dessa forma, a validação de um formulário poderia ser realizada pelo próprio 
navegador (lógica client-side) ao invés de delegada ao servidor (lógica
server-side). Caso um campo obrigatório fosse esquecido, uma aviso poderia
ser mostrado na página prevenindo o envio de uma requisição com dados
incompletos [6]. A conexão lenta da época motivava estratégias que
diminuíssem a frequência da comunicação entre cliente e servidor e a
quantidade de dados trafegados na rede. Tais práticas melhoravam a experiência
do usuário das aplicações web, mas ainda eram limitadas em desempenho
e interatividade quando comparadas à aplicações nativas, que ofereciam uma
amplitude de interações e responsividade aos usuários [7][8].

A demanda por melhorias na Web levou ao surgimento de um novo padrão
de desenvolvimento de aplicações: o AJAX (Asynchronous JavaScript
and XML) [8]. A técnica não se tratava de uma nova tecnologia, mas sim uma junção
revolucionária de várias tecnologias já existentes no mercado [7][8]:

* Formatação, estilização de conteúdo e interatividade: HTML, CSS e JavaScript;
* Atualização dinâmica e interação com o conteúdo: Document Object Model (DOM);
* Representação de dados para transferência entre cliente e servidor: XML;
* Requisições HTTP para transferência assíncrona de dados: XMLHttpRequest;

Aplicações desenvolvidas com o padrão AJAX eram capazes de criar ou recuperar
dados aplicando-os na página, que era atualizada imediatamente sem a necessidade
de recarregamento, o que trazia uma experiência bem mais fluida na
web. Aplicações como o Gmail e Google Maps foram pioneiras na utilização de AJAX
[7] e o padrão rapidamente se tornou uma tendência em aplicações de grandes
empresas (Google, Flickr, Amazon e várias outras [8]).  wijei Finalmente a web
ganhava dinâmicas comparáveis a aplicações desktop, com maior responsividade e interatividade.






[1] https://home.cern/science/computing/birth-web/short-history-web
[2] https://webfoundation.org/about/vision/history-of-the-web/
[3] http://info.cern.ch/Proposal.html
[4] https://timeline.web.cern.ch/cern-puts-world-wide-web-public-domain
[5] Building user interfaces with virtual DOM a comparison
[6] Miller D. The power of JavaScript
[7] Building Rich Web Apps with Ajax (linda dailey paulson)
[8] Ajax: A new approach to web applications (Jesse James Garrett)
[9] DHTML Utopia
[10] W3C: DOM https://dom.spec.whatwg.org/#what
