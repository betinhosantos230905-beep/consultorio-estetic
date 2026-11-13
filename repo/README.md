# Dra. Daniele Silveira — Landing page

Site de estética (Harmonização Facial e Corporal), Granja Viana | Cotia - SP.
HTML, CSS e JavaScript puros, sem build.

## Estrutura

    index.html        página única
    css/style.css     estilos do site
    css/intro.css     abertura animada
    js/main.js        menu, animações de rolagem, WhatsApp e Maps (CONFIG no topo)
    js/intro.js       abertura animada
    images/           fotografias (webp)

## Como rodar

Abra o `index.html` no navegador, ou sirva a pasta:

    python3 -m http.server 8000

## O que preencher

- **WhatsApp e endereço:** edite o `CONFIG` no topo de `js/main.js`.
  - `whatsapp`: só números com DDI e DDD, ex.: `5511999999999`
  - `endereco`: endereço completo (alimenta o botão do Google Maps)
- **Textos entre colchetes `[ ... ]`** no `index.html`: formação, registro, endereço e depoimentos.
- **Galeria:** troque o bloco "Novas fotos entram aqui" pelo `<figure>` indicado no comentário do `index.html`.
- **Fotos:** substitua os arquivos em `images/` mantendo os nomes.

## Abertura animada

Aparece na primeira visita da sessão. Para rever: adicione `?intro` ao endereço.
Não aparece para quem usa "reduzir movimento" nem em links com `#âncora`.

## Publicação

Qualquer hospedagem estática serve (GitHub Pages, Vercel, Netlify). Raiz do projeto = pasta publicada.
