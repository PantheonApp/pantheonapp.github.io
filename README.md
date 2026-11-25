# Site do Pantheon

Uma página estática: diz o que é o Pantheon, mostra o templo onde os deuses conversam (clicar num deus faz ele se
apresentar), explica como funciona, tem o botão de baixar a versão mais nova para Mac (Apple Silicon) e lista as
versões com as notas. A versão, o link do `.dmg` e a lista vêm, no navegador, da API pública de releases deste
repositório; sem a versão, o botão leva à página de releases, e se a API falhar a página mostra um link para ela.

- `index.html` tem a estrutura; `site.css` o estilo; `site.js` os textos em português e inglês, o templo e as versões;
  `mascote.js` desenha os deuses em SVG, um porte do `Mascote` do app (`web/src/components/Mascote.tsx`), com os
  gestos em CSS.
- Sem rastreador, sem fonte nem script de fora: as fontes estão em `fonts/` (licenças junto), e a CSP só aceita
  arquivos do próprio site e a API do GitHub.
- Com movimento reduzido nada se mexe sozinho: a conversa do templo começa pausada e só anda se a pessoa retomar.
- Cada versão é uma release deste repositório, criada por `tools/release-mac.sh` do repositório do app
  (`.dmg`, pacote do atualizador, assinatura e `latest.json`).
- Para ver local: `python3 -m http.server 8923` nesta pasta e abrir `http://127.0.0.1:8923` (os scripts são módulos,
  então abrir o arquivo direto não funciona).
- Publicação: GitHub Pages pela branch `main`, pasta raiz.
