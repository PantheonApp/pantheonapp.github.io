# Site do Pantheon

Uma página estática (`index.html`): diz o que é o Pantheon, tem o botão de baixar a versão mais nova para Mac
(Apple Silicon) e lista as versões com as notas. A lista vem, no navegador, da API pública de releases deste
repositório; se a API falhar, a página mostra um link para a página de releases.

- Sem rastreador, sem fonte nem script de fora: as fontes estão em `fonts/` (licenças junto).
- Cada versão é uma release deste repositório, criada por `tools/release-mac.sh` do repositório do app
  (`.dmg`, pacote do atualizador, assinatura e `latest.json`).
- Para ver local: `python3 -m http.server 8923` nesta pasta e abrir `http://127.0.0.1:8923`.
- Publicação: GitHub Pages pela branch `main`, pasta raiz.
