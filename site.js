// The landing page: the two languages, the temple where the gods talk, the sections that rise into view and the
// releases from GitHub's public API. Every text goes in with textContent; only this repository's URLs reach an href.
import { mascote, fillMascotes } from "./mascote.js";

const REPO = "PantheonApp/pantheonapp.github.io";
const API = "https://api.github.com/repos/" + REPO + "/releases";
const PAGE = "https://github.com/" + REPO + "/releases";

const GOD_IDS = ["minerva", "mercurio", "vulcano", "hercules", "jano", "vesta", "argus", "dedalo"];
// who talks to whom, in turns: [first, second]; the lines are in T[lang].talks
const TALKS = [["vulcano", "dedalo"], ["mercurio", "minerva"], ["jano", "argus"], ["vesta", "vulcano"], ["vulcano", "hercules"], ["dedalo", "mercurio"]];

const T = {
  pt: {
    navLabel: "Seções", navFeatures: "Recursos", navMarket: "Marketplace", navHow: "Como funciona",
    download: "Baixar para Mac", downloadShort: "Baixar", seeFeatures: "Ver os recursos",
    kicker: "Conselho de IAs", title: "Um conselho de IAs para a sua organização",
    lead: "O Pantheon junta o que a sua organização sabe e põe assistentes para trabalhar com isso. Eles rodam no seu Mac, com o Claude Code que você já usa.",
    requires: "Apple Silicon, macOS 13 ou mais recente", version: "versão {v}",
    godsLabel: "Os deuses do conselho",
    plateHint: "Eles conversam entre si. Clique num deus para ele se apresentar.",
    pause: "Pausar a conversa", play: "Retomar a conversa", resume: "Voltar à conversa", see: "Ver {area}",
    featuresTitle: "Cada deus explica o que faz por você", featuresSub: "Escolha um deus. Ele conta o que cuida, e ao lado você experimenta.",
    marketTitle: "O que dá para instalar no panteão", marketSub: "Um marketplace público, com índice assinado. Qualquer pessoa pode propor um item, e nenhum deles traz código para rodar.",
    howTitle: "Do download à primeira resposta",
    step1: "Baixe e abra", step1Text: "O Jano recebe você na porta e mostra o caminho, num roteiro que dá para pular.",
    step2: "Aponte as suas pastas", step2Text: "O app lê o que estiver nelas e monta a busca no seu próprio Mac.",
    step3: "Chame o conselho", step3Text: "Pergunte, converse, ligue uma automação. Quem responde é o Claude Code que você já tem.",
    platMac: "Roda no seu Mac", platClaude: "Com o Claude Code que você já usa", platTeam: "O panteão do time é opcional",
    dlKicker: "A porta está aberta", dlTitle: "Baixe o Pantheon para Mac", downloadVersion: "Baixar a versão {v}",
    platOk: "Mac com Apple Silicon, macOS 13 ou mais recente", platNo: "Mac com Intel, Windows e Linux: ainda não",
    size: "Arquivo de {n} MB. ", updates: "O app se atualiza sozinho depois de instalado.",
    allVersions: "Ver todas as versões e o que mudou em cada uma",
    versions: "Versões", versionsSub: "O que mudou em cada versão",
    loading: "Carregando a lista de versões.", latest: "Mais nova", empty: "Ainda não há versões publicadas.",
    failed: "Não foi possível carregar a lista de versões agora. Veja todas na página de versões do GitHub.", failedLink: "Abrir a página de versões",
    footerTag: "Um conselho de IAs para a sua organização.", backTop: "Voltar ao topo",
    footer: "Esta página não usa rastreadores nem serviços externos, só a lista pública de versões do GitHub.",
    switchLabel: "Switch to English", switchText: "English", locale: "pt-BR",
    picksLabel: "Deuses e recursos",
    // what each demo in the app window says; the examples are made up, and the page says so where it matters
    d: {
      again: "Ver de novo", on: "Ligado", off: "Desligado",
      ask: { k: "Conhecimento", t: "Pergunte à Minerva", note: "Exemplo com documentos inventados. No app, a resposta cita os seus.",
        qa: [
          ["Como publicamos uma versão?", "Sobe a versão nos três arquivos, abre o PR, espera a esteira e cria a tag. O app do Mac é gerado e publicado depois da tag.", ["Publicar · Passo a passo", "Esteira · Regras"]],
          ["Quem decide o que o agente pode escrever?", "Quem administra a organização. Ferramenta que escreve fora do Mac sai sempre por um cartão que a pessoa aprova.", ["ADR 0004 · Permissão da sessão"]],
          ["Onde ficam as notas?", "Na coleção Notas do Conhecimento. Cada nota é da pessoa que a guardou, e a busca só mostra o que ela pode ver.", ["Conhecimento · Notas", "ADR 0002 · Documento tem um dono"]]
        ] },
      talk: { k: "Mensagens", t: "O seu Claude fala com o do colega", asks: "O Claude da Ana pergunta: a migração do banco já pode entrar hoje?",
        draft: "Rascunho do seu Claude", reply: "Pode. A esteira passou e a revisão foi aprovada ontem.", back: "Combinado, a Ana foi avisada.",
        send: "Aprovar e enviar", wait: "O que sai em seu nome espera o seu sim." },
      flow: { k: "Automações", t: "Revisar PR quando pedirem",
        nodes: [["Quando", "Pedirem a sua revisão"], ["Lê", "Título, descrição e diff"], ["IA", "Revisa com o seu agente"]],
        waiting: ["Espera você", "Publicar a revisão"], done: ["Feito", "Revisão publicada na PR"],
        ready: "A revisão está pronta", readyText: "Dois pontos de atenção e um elogio. Nada sai sem o seu sim.", approve: "Aprovar e publicar",
        published: "Publicado", publishedText: "A execução fica guardada como uma conversa, passo a passo." },
      agents: { k: "Agentes", t: "Agentes com versão", count: "{n} de 3 no seu Claude Code", model: "Modelo", version: "Versão",
        inClaude: "No meu Claude Code", alt: "Avatar de {n}", label: "{n} no meu Claude Code",
        list: [["Revisor de PR", "Revisar um PR antes do merge"], ["Redator de versão", "Escrever o que mudou numa versão"], ["Guardião dos termos", "Conferir se o texto usa os nomes combinados"]],
        note: "Cada agente é um conjunto de instruções com histórico. Ligado, o seu Claude Code passa a chamá-lo." },
      work: { k: "Trabalho", t: "Do push à main", merge: "Mergear o primeiro PR", undo: "Desfazer", inPr: "Em PR", onMain: "Na main",
        cards: ["Agentes ligam e desligam no Claude Code", "Renovar o acesso ao Slack sozinho", "Interruptor até o fim do cartão"],
        passed: "Esteira passou", failed: "Esteira falhou", mainAgo: "Na main há 40 min", mainNow: "Na main agora" },
      gate: { k: "Conexões", t: "Ligue um serviço uma vez", vault: "O token fica no cofre do panteão. Quem administra decide o que cada conexão pode escrever.", market: "Ver o marketplace" },
      fire: { k: "Status", ok: "Tudo em ordem", down: "Uma fonte parou", simulate: "Simular uma fonte parada", restore: "Voltar ao normal",
        index: ["Índice do Conhecimento", "128 documentos, atualizado há 4 min"], sources: ["Fontes", "3 de 3 respondendo", "Wiki do time parada há 12 min"],
        conns: ["Conexões", "GitHub ligado"], fine: "Em dia", stopped: "Parada", note: "Exemplo com dados inventados." },
      watch: { k: "Mac acordado", on: "Argus está de vigia", off: "O Mac pode dormir", wake: "Acordar o Argus",
        onText: "Uma automação está rodando. O Mac fica acordado até ela terminar.", offText: "Nada rodando. O Mac dorme quando quiser." },
      face: { k: "Avatares", t: "Monte o seu", sizes: ["Grande", "Nas conversas", "Nas listas"], alt: "O seu avatar, {s}",
        color: "Cor", colorLabel: "Cor do avatar", head: "Na cabeça", headLabel: "O que o avatar usa na cabeça", bg: "Fundo", bgLabel: "Fundo do avatar",
        bodies: ["Terracota", "Azul", "Verde", "Dourado", "Lilás"], bgs: ["Marrom", "Azul escuro", "Verde escuro", "Roxo", "Vinho"],
        accs: ["Nada", "Elmo", "Asas", "Louros", "Pele de leão"],
        note: "No app, você escolhe um pronto ou pede ao Dédalo um desenho sob medida, numa conversa." }
    },
    mShow: "Mostrar", mPubK: "Publicado", mPubT: "No índice de hoje", mRepo: "Abrir o repositório do marketplace",
    mContribK: "Contribuir", mContribT: "Como publicar um item", mGuide: "Ler o guia de contribuição",
    m: {
      kinds: ["Tudo", "Conexões", "Modelos de automação", "Plugins"], plugins: "Plugins do Claude Code ainda não entram no marketplace.",
      open: "Ver o que pede", close: "Fechar", connection: "Conexão · versão {v}", template: "Modelo de automação · versão {v}",
      templatesNote: "Os modelos já estão no índice. Instalar pelo app chega com a próxima versão do panteão.",
      how: [
        ["Prepare o arquivo", "Cada item é um JSON, com nome e descrição em português e em inglês: conexão em `connections/`, modelo de automação em `templates/`. É só dado, sem código."],
        ["Confira o que não pode", "Nada de comando, script baixado, servidor local ou endereço de rede interna."],
        ["Rode o validador", "Com Node 22 ou mais novo: `npm ci --ignore-scripts`, `npm run validate` e `npm test`. Cada erro diz o arquivo e o campo."],
        ["Abra o pull request", "A esteira valida de novo e quem mantém revisa. A cada mudança, a versão do item sobe."],
        ["Depois do merge", "A esteira assina o índice e publica. O item passa a aparecer no panteão de quem usa."]
      ]
    },
    gods: {
      minerva: ["Minerva", "Conhecimento", "Leio o que a sua organização sabe, e digo de onde tirei.",
        "Eu guardo o que a sua organização sabe. Você pergunta em português, eu procuro nos seus documentos e respondo dizendo de onde tirei cada coisa. O seu Claude Code também me consulta antes de afirmar algo.",
        ["Resposta com a citação da fonte", "A busca só mostra o que você pode ver", "Notas suas, guardadas na hora"]],
      mercurio: ["Mercúrio", "Mensagens", "Levo o recado e volto com a resposta.",
        "Eu levo os recados. Aqui conversam as pessoas, os deuses e o Claude de cada um, tudo na mesma conversa. O seu Claude escreve em seu nome como rascunho, e só responde sozinho nas conversas que você aceitou.",
        ["Salas com pessoas e agentes", "Chame um agente com @", "Rascunho até você aprovar"]],
      vulcano: ["Vulcano", "Agentes e automações", "Forjo os agentes, e cada martelada vira uma versão.",
        "Eu forjo os agentes e as automações. Um agente é um especialista com instruções e versão. Uma automação junta os passos: lê um PR, chama um agente e para num cartão, esperando o seu sim antes de escrever lá fora.",
        ["Agentes com histórico de versões", "Ligue cada um no seu Claude Code", "Escrever fora do Mac, só com aprovação"]],
      hercules: ["Hércules", "Trabalho", "Doze trabalhos me deram, e levo cada um até o fim.",
        "Eu acompanho o trabalho até o fim. Mostro os seus PRs abertos e os que entraram na main, com a esteira, a revisão e a conversa do Claude que abriu cada um. Se um Claude está esperando você, eu aviso.",
        ["Lido do seu GitHub, sem digitar nada", "Esteira e revisão em cada cartão", "Do cartão para a conversa que abriu o PR"]],
      jano: ["Jano", "Conexões e acessos", "Uma face olha para dentro, a outra para fora, e sei quem entrou.",
        "Eu guardo as portas. Você liga o GitHub e outros serviços uma vez, e a chave fica no cofre. No marketplace há conexões prontas, e cada uma diz o que pede antes de entrar.",
        ["Token guardado no cofre", "Cada conexão mostra o que pede", "Marketplace público, com conexões e modelos de automação"]],
      vesta: ["Vesta", "Status", "Guardo a chama: se algo apagar, você fica sabendo.",
        "Eu guardo a chama. Num lugar só você vê se o índice, as fontes e as conexões estão de pé. Se algo apagar, eu digo o que foi e desde quando.",
        ["Índice, fontes e conexões num lugar", "Aviso quando algo para"]],
      argus: ["Argus", "Mac acordado", "Cem olhos, e nunca fecho todos de uma vez.",
        "Eu fico de vigia. Enquanto um deus trabalha, eu seguro o seu Mac acordado. Quando o trabalho termina, eu solto e ele volta a dormir.",
        ["O trabalho longo não para no meio", "Solta o Mac sozinho no fim"]],
      dedalo: ["Dédalo", "Avatares", "Desenho o rosto de cada um, com régua e compasso.",
        "Eu desenho os rostos. Cada pessoa e cada agente ganha um avatar em pixel. Você escolhe um pronto ou me pede um sob medida, numa conversa.",
        ["Um rosto para cada pessoa e agente", "Pronto ou desenhado sob medida"]]
    },
    talks: [
      ["Forjei um agente novo hoje. Só falta o rosto.", "Deixa comigo. Só não me peça asas de cera outra vez."],
      ["Chegou pergunta nova. Você sabe de onde sai a resposta?", "Sei, e levo a fonte junto. Sabedoria sem citação é boato."],
      ["Fechei as portas por hoje. Você não dorme nunca?", "Tenho cem olhos e um café. Alguém precisa vigiar o Mac."],
      ["Sua forja está soltando faísca no meu fogo.", "É automação rodando. Faísca é sinal de trabalho."],
      ["Hércules, de novo essa pele de leão? Posso forjar uma armadura.", "A pele já aguentou de tudo. Guarde o ferro para os seus agentes."],
      ["Mercúrio, para o seu avatar, de frente ou de perfil?", "Em movimento. Se eu paro, alguém fica sem resposta."]
    ]
  },
  en: {
    navLabel: "Sections", navFeatures: "Features", navMarket: "Marketplace", navHow: "How it works",
    download: "Download for Mac", downloadShort: "Download", seeFeatures: "See the features",
    kicker: "Council of AIs", title: "A council of AIs for your organization",
    lead: "Pantheon gathers what your organization knows and puts assistants to work on it. They run on your Mac, with the Claude Code you already use.",
    requires: "Apple Silicon, macOS 13 or later", version: "version {v}",
    godsLabel: "The gods of the council",
    plateHint: "They talk among themselves. Click a god and they introduce themselves.",
    pause: "Pause the conversation", play: "Resume the conversation", resume: "Back to the conversation", see: "See {area}",
    featuresTitle: "Each god explains what they do for you", featuresSub: "Pick a god. They tell you what they look after, and you try it right beside them.",
    marketTitle: "What you can install in the pantheon", marketSub: "A public marketplace with a signed index. Anyone can propose an item, and none of them brings code to run.",
    howTitle: "From download to first answer",
    step1: "Download and open", step1Text: "Janus greets you at the door and shows you the way, in a tour you can skip.",
    step2: "Point to your folders", step2Text: "The app reads what is in them and builds the search on your own Mac.",
    step3: "Call the council", step3Text: "Ask, talk, turn on an automation. The one answering is the Claude Code you already have.",
    platMac: "Runs on your Mac", platClaude: "With the Claude Code you already use", platTeam: "The team pantheon is optional",
    dlKicker: "The door is open", dlTitle: "Download Pantheon for Mac", downloadVersion: "Download version {v}",
    platOk: "Mac with Apple Silicon, macOS 13 or later", platNo: "Intel Mac, Windows and Linux: not yet",
    size: "A {n} MB file. ", updates: "The app updates itself once installed.",
    allVersions: "See every version and what changed in each one",
    versions: "Versions", versionsSub: "What changed in each version",
    loading: "Loading the list of versions.", latest: "Latest", empty: "No versions have been published yet.",
    failed: "The list of versions could not be loaded right now. See all of them on the GitHub releases page.", failedLink: "Open the releases page",
    footerTag: "A council of AIs for your organization.", backTop: "Back to top",
    footer: "This page uses no trackers and no outside services, only GitHub's public list of releases.",
    switchLabel: "Mudar para português", switchText: "Português", locale: "en",
    picksLabel: "Gods and features",
    d: {
      again: "Show it again", on: "On", off: "Off",
      ask: { k: "Knowledge", t: "Ask Minerva", note: "An example with made-up documents. In the app, the answer cites yours.",
        qa: [
          ["How do we publish a version?", "Bump the version in the three files, open the PR, wait for the checks and create the tag. The Mac app is built and published after the tag.", ["Publishing · Step by step", "Checks · Rules"]],
          ["Who decides what an agent can write?", "Whoever runs the organization. A tool that writes outside the Mac always goes through a card the person approves.", ["ADR 0004 · Session permission"]],
          ["Where are the notes kept?", "In the Notes collection of Knowledge. Each note belongs to the person who saved it, and search only shows what they can see.", ["Knowledge · Notes", "ADR 0002 · A document has one owner"]]
        ] },
      talk: { k: "Messages", t: "Your Claude talks to your colleague's", asks: "Ana's Claude asks: can the database migration go in today?",
        draft: "Your Claude's draft", reply: "It can. The checks passed and the review was approved yesterday.", back: "Got it, Ana has been told.",
        send: "Approve and send", wait: "What goes out in your name waits for your yes." },
      flow: { k: "Automations", t: "Review a PR when asked",
        nodes: [["When", "Your review is requested"], ["Reads", "Title, description and diff"], ["AI", "Reviews with your agent"]],
        waiting: ["Waiting for you", "Publish the review"], done: ["Done", "Review published on the PR"],
        ready: "The review is ready", readyText: "Two things to look at and one compliment. Nothing goes out without your yes.", approve: "Approve and publish",
        published: "Published", publishedText: "The run is kept as a conversation, step by step." },
      agents: { k: "Agents", t: "Agents with versions", count: "{n} of 3 in your Claude Code", model: "Model", version: "Version",
        inClaude: "In my Claude Code", alt: "Avatar of {n}", label: "{n} in my Claude Code",
        list: [["PR reviewer", "Review a PR before the merge"], ["Release writer", "Write what changed in a version"], ["Keeper of terms", "Check that the text uses the agreed names"]],
        note: "Each agent is a set of instructions with a history. Turned on, your Claude Code starts calling it." },
      work: { k: "Work", t: "From push to main", merge: "Merge the first PR", undo: "Undo", inPr: "In PR", onMain: "On main",
        cards: ["Agents turn on and off in Claude Code", "Renew the Slack access on its own", "Switch all the way to the end of the card"],
        passed: "Checks passed", failed: "Checks failed", mainAgo: "On main 40 min ago", mainNow: "On main now" },
      gate: { k: "Connections", t: "Connect a service once", vault: "The token stays in the pantheon's vault. Whoever runs it decides what each connection can write.", market: "See the marketplace" },
      fire: { k: "Status", ok: "All is well", down: "A source stopped", simulate: "Simulate a stopped source", restore: "Back to normal",
        index: ["Knowledge index", "128 documents, updated 4 min ago"], sources: ["Sources", "3 of 3 responding", "Team wiki stopped 12 min ago"],
        conns: ["Connections", "GitHub connected"], fine: "Up to date", stopped: "Stopped", note: "An example with made-up data." },
      watch: { k: "Mac awake", on: "Argus is on watch", off: "The Mac can sleep", wake: "Wake Argus",
        onText: "An automation is running. The Mac stays awake until it ends.", offText: "Nothing running. The Mac sleeps whenever it wants." },
      face: { k: "Avatars", t: "Make your own", sizes: ["Large", "In conversations", "In lists"], alt: "Your avatar, {s}",
        color: "Color", colorLabel: "Avatar color", head: "On the head", headLabel: "What the avatar wears on its head", bg: "Background", bgLabel: "Avatar background",
        bodies: ["Terracotta", "Blue", "Green", "Gold", "Lilac"], bgs: ["Brown", "Dark blue", "Dark green", "Purple", "Wine"],
        accs: ["Nothing", "Helmet", "Wings", "Laurels", "Lion skin"],
        note: "In the app, you pick a ready one or ask Daedalus for one drawn to measure, in a conversation." }
    },
    mShow: "Show", mPubK: "Published", mPubT: "In today's index", mRepo: "Open the marketplace repository",
    mContribK: "Contribute", mContribT: "How to publish an item", mGuide: "Read the contribution guide (in Portuguese)",
    m: {
      kinds: ["All", "Connections", "Automation templates", "Plugins"], plugins: "Claude Code plugins are not in the marketplace yet.",
      open: "See what it asks for", close: "Close", connection: "Connection · version {v}", template: "Automation template · version {v}",
      templatesNote: "The templates are already in the index. Installing them from the app comes with the next version of the pantheon.",
      how: [
        ["Prepare the file", "Each item is a JSON file, with a name and description in Portuguese and in English: a connection goes in `connections/`, an automation template in `templates/`. It is only data, no code."],
        ["Check what is not allowed", "No commands, downloaded scripts, local servers or internal network addresses."],
        ["Run the validator", "With Node 22 or newer: `npm ci --ignore-scripts`, `npm run validate` and `npm test`. Each error names the file and the field."],
        ["Open the pull request", "The checks validate it again and a maintainer reviews it. With every change, the item's version goes up."],
        ["After the merge", "The checks sign the index and publish it. The item starts showing up in the pantheon of everyone who uses it."]
      ]
    },
    gods: {
      minerva: ["Minerva", "Knowledge", "I read what your organization knows, and tell you where I got it.",
        "I keep what your organization knows. You ask in your own words, I search your documents and answer saying where each thing came from. Your Claude Code also checks with me before it states something.",
        ["Answers that cite their source", "Search only shows what you are allowed to see", "Your own notes, saved on the spot"]],
      mercurio: ["Mercury", "Messages", "I carry the message and come back with the answer.",
        "I carry the messages. Here people, gods and each person's Claude talk, all in the same conversation. Your Claude writes on your behalf as a draft, and only answers on its own in the conversations you allowed.",
        ["Rooms with people and agents", "Call an agent with @", "A draft until you approve it"]],
      vulcano: ["Vulcan", "Agents and automations", "I forge the agents, and every hammer blow becomes a version.",
        "I forge the agents and the automations. An agent is a specialist with instructions and a version. An automation strings the steps together: it reads a PR, calls an agent and stops at a card, waiting for your yes before writing anywhere outside.",
        ["Agents with a version history", "Turn each one on in your Claude Code", "Writing outside the Mac only with approval"]],
      hercules: ["Hercules", "Work", "They gave me twelve labors, and I see each one through.",
        "I follow the work to the end. I show your open PRs and the ones merged into main, with the checks, the review and the conversation of the Claude that opened each one. If a Claude is waiting for you, I let you know.",
        ["Read from your GitHub, nothing to type", "Checks and review on every card", "From the card to the conversation that opened the PR"]],
      jano: ["Janus", "Connections and access", "One face looks in, the other looks out, and I know who came in.",
        "I guard the doors. You connect GitHub and other services once, and the key stays in the vault. The marketplace has ready connections, and each one says what it asks for before it comes in.",
        ["The token is kept in the vault", "Every connection shows what it asks for", "A public marketplace with connections and automation templates"]],
      vesta: ["Vesta", "Status", "I keep the flame: if something goes out, you will know.",
        "I keep the flame. In one place you see whether the index, the sources and the connections are up. If something goes out, I tell you what it was and since when.",
        ["Index, sources and connections in one place", "A warning when something stops"]],
      argus: ["Argus", "Mac awake", "A hundred eyes, and I never close them all at once.",
        "I keep watch. While a god works, I keep your Mac awake. When the work ends, I let go and it goes back to sleep.",
        ["Long work does not stop halfway", "Lets the Mac go on its own at the end"]],
      dedalo: ["Daedalus", "Avatars", "I draw everyone's face, with ruler and compass.",
        "I draw the faces. Every person and every agent gets a pixel avatar. You pick a ready one or ask me for one made to measure, in a conversation.",
        ["A face for every person and agent", "Ready made or drawn to measure"]]
    },
    talks: [
      ["I forged a new agent today. It only needs a face.", "Leave it to me. Just don't ask for wax wings again."],
      ["A new question came in. Do you know where the answer comes from?", "I do, and I bring the source along. Wisdom without a citation is a rumor."],
      ["I closed the doors for today. Don't you ever sleep?", "I have a hundred eyes and a coffee. Someone has to watch the Mac."],
      ["Your forge is throwing sparks into my fire.", "That's an automation running. Sparks mean work."],
      ["Hercules, that lion skin again? I could forge you some armor.", "The skin has been through everything. Save the iron for your agents."],
      ["Mercury, for your avatar, front or profile?", "In motion. If I stop, someone goes without an answer."]
    ]
  }
};

// The marketplace as it is in today's index. On the real site the list would come from the signed index; here it is
// fixed, so swapping it later only means replacing this array. Each item carries its own words in both languages.
const MARKET = [
  { kind: "connection", logo: "github", version: 1,
    pt: { name: "GitHub", text: "Servidor MCP oficial do GitHub, com um token pessoal que o panteão guarda no cofre.",
      facts: [["Como você entra", "Token de acesso"], ["Onde roda", "No panteão do time"], ["Servidor", "api.githubcopilot.com/mcp"], ["Endereços que acessa", "api.githubcopilot.com"], ["Código para rodar", "Nenhum"]] },
    en: { name: "GitHub", text: "GitHub's official MCP server, with a personal token the pantheon keeps in the vault.",
      facts: [["How you sign in", "Access token"], ["Where it runs", "On the team pantheon"], ["Server", "api.githubcopilot.com/mcp"], ["Addresses it reaches", "api.githubcopilot.com"], ["Code to run", "None"]] } },
  { kind: "template", version: 1,
    pt: { name: "Revisar PRs pelo Teams", text: "Revisa o pull request quando o link aparece num canal ou chat do Teams, espera a esteira e reage na mensagem com o veredito.",
      facts: [["Usa", "Teams e GitHub"], ["Você escolhe ao instalar", "Os chats, os canais e o dono no GitHub"], ["Escreve fora do Mac", "Só com a sua aprovação"], ["Código para rodar", "Nenhum"]] },
    en: { name: "Review PRs from Teams", text: "Reviews the pull request when its link shows up in a Teams channel or chat, waits for the checks and reacts to the message with the verdict.",
      facts: [["Uses", "Teams and GitHub"], ["You choose when installing", "The chats, the channels and the GitHub owner"], ["Writes outside the Mac", "Only with your approval"], ["Code to run", "None"]] } },
  { kind: "template", version: 1,
    pt: { name: "Responder em thread de review", text: "Quando alguém responde numa thread de review do GitHub que você abriu, avalia a resposta contra o código de agora e deixa a réplica na fila.",
      facts: [["Usa", "GitHub"], ["Você escolhe ao instalar", "O dono no GitHub"], ["Escreve fora do Mac", "Só com a sua aprovação"], ["Código para rodar", "Nenhum"]] },
    en: { name: "Reply in a review thread", text: "When someone replies in a GitHub review thread you opened, it weighs the reply against the code as it is now and leaves the answer in the queue.",
      facts: [["Uses", "GitHub"], ["You choose when installing", "The GitHub owner"], ["Writes outside the Mac", "Only with your approval"], ["Code to run", "None"]] } },
  { kind: "template", version: 1,
    pt: { name: "Alertas do canal", text: "Observa os alertas nos canais do Teams que você escolher e avisa nesta máquina, em poucas linhas, o que precisa de atenção.",
      facts: [["Usa", "Teams"], ["Você escolhe ao instalar", "Os canais"], ["Escreve fora do Mac", "Não escreve: o resumo é um aviso local"], ["Código para rodar", "Nenhum"]] },
    en: { name: "Channel alerts", text: "Watches the alerts in the Teams channels you choose and tells you on this machine, in a few lines, what needs attention.",
      facts: [["Uses", "Teams"], ["You choose when installing", "The channels"], ["Writes outside the Mac", "It does not write: the summary is a local notice"], ["Code to run", "None"]] } }
];

const $ = (id) => document.getElementById(id);
const el = (tag, text, cls) => { const e = document.createElement(tag); if (text != null) e.textContent = text; if (cls) e.className = cls; return e; };
// only links that point at this repository's own releases are ever put in an href
const safe = (u) => (typeof u === "string" && u.indexOf("https://github.com/" + REPO + "/") === 0 ? u : null);

let lang = (navigator.language || "pt").toLowerCase().indexOf("en") === 0 ? "en" : "pt";
let releases = null, failed = false, latestUrl = null, latestVersion = null, latestMB = null;

// ---- the temple ----
// The gods talk in turns, one line every 3.2 s, until someone picks one or pauses them. With reduced motion the talk
// starts paused on its first line and only moves if the person resumes it.
const reduced = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
const st = { auto: true, paused: reduced(), talk: 0, phase: 0, god: 0 };
const god = (id) => T[lang].gods[id];
const at = (id) => GOD_IDS.indexOf(id);
// the balloon opens to the right over the first two, to the left over the last two, centred in between
const side = (i) => (i < 2 ? "say-l" : i > 5 ? "say-r" : "say-c");
// what the god says on the plate: the first two sentences of his whole explanation
const intro = (says) => says.split(". ").slice(0, 2).join(". ") + ".";
let shown = "", buttons = [];

function buildGods() {
  const box = $("gods");
  buttons = GOD_IDS.map((id, i) => {
    const gw = el("div", null, "gw");
    const b = el("button", null, "god");
    b.type = "button";
    const art = el("span", null, "god-art");
    art.appendChild(mascote(id, 88, { fundo: "nenhum" }));
    const shade = el("span", null, "shade");
    shade.setAttribute("aria-hidden", "true");
    b.append(art, shade, el("span", null, "god-name"));
    // the god introduces himself here and becomes the one explaining in the features; only the plate is announced
    b.addEventListener("click", () => {
      set({ auto: false, god: i });
      const g = god(id);
      $("temple-live").textContent = g[0] + " · " + g[1] + ". " + intro(g[3]);
      pickFeature(i, false, true);
    });
    gw.appendChild(b);
    box.appendChild(gw);
    return b;
  });
}

function set(patch) { Object.assign(st, patch); renderTemple(); }

function renderTemple() {
  const t = T[lang], talk = TALKS[st.talk % TALKS.length];
  const speaker = st.auto ? at(talk[st.phase]) : st.god;
  const saying = st.auto ? t.talks[st.talk % TALKS.length][st.phase] : god(GOD_IDS[st.god])[2];
  buttons.forEach((b, i) => {
    b.className = i === speaker ? "god on" : "god";
    b.setAttribute("aria-pressed", !st.auto && i === st.god ? "true" : "false");
    b.lastChild.textContent = god(GOD_IDS[i])[0];
  });
  // a new line is a new balloon, so it pops in again; the same line stays where it is
  const key = speaker + "|" + saying;
  if (key !== shown) {
    shown = key;
    const old = document.querySelector(".gods .say");
    if (old) old.remove();
    // the talk is decoration for the eyes: it is not a live region, or a screen reader would be cut off every 3.2 s
    const say = el("div", saying, "say " + side(speaker) + " pop0");
    say.setAttribute("data-side", side(speaker));
    buttons[speaker].parentNode.insertBefore(say, buttons[speaker]);
    keepInside(say);
  }
  $("plate-talk").hidden = !st.auto;
  $("plate-solo").hidden = st.auto;
  $("pause").textContent = st.paused ? t.play : t.pause;
  if (!st.auto) {
    const g = god(GOD_IDS[st.god]);
    $("sel-who").textContent = g[0] + " · " + g[1];
    $("sel-text").textContent = intro(g[3]);
    $("sel-link").textContent = t.see.replace("{area}", g[1]);
  }
}

// On a narrow screen the gods wrap in rows of three, and a centred balloon over the last of a row would be cut by the
// temple's edge: there it opens to the side that fits instead.
function keepInside(say) {
  const stage = $("stage").getBoundingClientRect(), r = say.getBoundingClientRect();
  if (r.right > stage.right - 4) say.className = say.className.replace(/say-[clr]/, "say-r");
  else if (r.left < stage.left + 4) say.className = say.className.replace(/say-[clr]/, "say-l");
}

// the window changed size: the balloon goes back to its own side and is measured again
let placing = 0;
function replaceSay() {
  cancelAnimationFrame(placing);
  placing = requestAnimationFrame(() => {
    const say = document.querySelector(".gods .say");
    if (!say) return;
    say.className = say.className.replace(/say-[clr]/, say.getAttribute("data-side"));
    keepInside(say);
  });
}
window.addEventListener("resize", replaceSay);
window.addEventListener("orientationchange", replaceSay);

// The talk only moves while the temple is on screen. Every start of the clock gives the current line its full 3.2 s.
let clock = 0, inView = true;
function tick() {
  if (!st.auto || st.paused || !inView) return;
  if (st.phase === 0) set({ phase: 1 });
  else set({ phase: 0, talk: (st.talk + 1) % TALKS.length });
}
function restartClock() { clearInterval(clock); clock = setInterval(tick, 3200); }
restartClock();
if (typeof IntersectionObserver === "function") {
  new IntersectionObserver((list) => list.forEach((e) => {
    const was = inView;
    inView = e.isIntersecting;
    if (inView && !was) restartClock();
  })).observe($("stage"));
}

$("pause").addEventListener("click", () => { set({ paused: !st.paused }); restartClock(); });
$("resume").addEventListener("click", () => {
  // back to the talk as it was: a pause the person chose, or the one reduced motion starts with, stays
  set({ auto: true, phase: 0 });
  restartClock();
  // the button that had the focus is gone: the focus goes to the one that took its place
  $("pause").focus();
});
if (window.matchMedia) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.addEventListener) mq.addEventListener("change", () => { if (mq.matches) set({ paused: true }); });
}

// ---- the features ----
// One god is picked; his balloon explains the area word by word, and the app window beside him runs a small demo of
// it. The demos keep their state while you switch gods. Each demo is built once per pick and then only patched, so
// the eyes, the switches and the cards move from where they were instead of being redrawn.
const fs = { sel: 0, turn: 0, flip: 0, q: 0, sent: false, approved: false, on: [true, false, true], merged: false, open: false, down: false, awake: true, body: 0, acc: 1, bg: 0 };
const ms = { kind: 0, open: -1 };
let tabs = [], demo = null;

// an element with its children; strings become text nodes, so nothing is ever parsed as HTML
function h(tag, cls, kids, attrs) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
  [].concat(kids == null ? [] : kids).forEach((c) => { if (c != null && c !== false) e.append(c); });
  return e;
}
function btn(cls, kids, onClick, attrs) {
  const b = h("button", cls, kids, Object.assign({ type: "button" }, attrs));
  b.addEventListener("click", onClick);
  return b;
}
const wt = (k, title) => h("div", "wt", [h("div", "eyebrow", k), h("div", "display", title)]);
const press = (b, on) => { b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); };
const NS = "http://www.w3.org/2000/svg";
function svg(w, attrs, shapes) {
  const s = document.createElementNS(NS, "svg");
  const all = Object.assign({ width: w, height: w, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false" }, attrs);
  for (const k in all) s.setAttribute(k, all[k]);
  shapes.forEach(([tag, a]) => { const n = document.createElementNS(NS, tag); for (const k in a) n.setAttribute(k, a[k]); s.appendChild(n); });
  return s;
}
const bookIcon = () => svg(12, { fill: "none", stroke: "currentColor", "stroke-width": "2" }, [["path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" }]]);
const GITHUB = "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z";
const logo = (it) => h("span", "logo", it.logo === "github"
  ? svg(24, { fill: "#F4EFE4" }, [["path", { d: GITHUB }]])
  : svg(22, { fill: "none", stroke: "#E3C77E", "stroke-width": "1.8" }, [["rect", { x: 3, y: 4, width: 7, height: 6, rx: 1.5 }], ["rect", { x: 14, y: 14, width: 7, height: 6, rx: 1.5 }], ["path", { d: "M10 7h4a3 3 0 0 1 3 3v4" }]]),
  { "aria-hidden": "true" });

// A face: the body every god has, in one colour, one thing on the head and one background. Same grid as mascote.js.
const BODY_COLORS = ["#D97757", "#7BA7D9", "#8DB57A", "#D9B45A", "#B48AD9"];
const BG_COLORS = ["#33261C", "#1E2A3A", "#1C2E2A", "#2B1F33", "#3A1A20"];
const HEADS = [
  [],
  [[1, 1.3, 8, 1, "#D9B45A"], [2, 0.4, 6, 0.9, "#D9B45A"], [4.6, 2.3, 0.8, 1.2, "#D9B45A"], [2.5, -1.5, 5, 1.2, "#C8453A"]],
  [[2, 0.5, 6, 0.9, "#AFC3DA"], [1, 1.3, 8, 0.7, "#AFC3DA"], [-0.9, -0.6, 2.3, 0.6, "#F4EFE4"], [-0.5, 0, 1.9, 0.6, "#F4EFE4"], [8.6, -0.6, 2.3, 0.6, "#F4EFE4"], [8.6, 0, 1.9, 0.6, "#F4EFE4"]],
  [[1, 1.5, 8, 0.6, "#8DB57A"], [1.5, 0.9, 1, 0.6, "#8DB57A"], [3.5, 0.9, 1, 0.6, "#8DB57A"], [5.5, 0.9, 1, 0.6, "#8DB57A"], [7.5, 0.9, 1, 0.6, "#8DB57A"]],
  [[0.7, 0.9, 8.6, 1.3, "#D2A257"], [1, 0.2, 1.3, 0.7, "#D2A257"], [7.7, 0.2, 1.3, 0.7, "#D2A257"], [4.6, 1.55, 0.8, 0.5, "#8A5F2C"], [0.4, 2, 0.6, 2.4, "#8A5F2C"], [9, 2, 0.6, 2.4, "#8A5F2C"]]
];
function face(px, cls) {
  const box = h("div", "av" + (cls ? " " + cls : ""));
  box.style.width = box.style.height = px + "px";
  return { node: box, paint(body, acc, bg, alt) {
    box.style.backgroundColor = BG_COLORS[bg];
    const c = BODY_COLORS[body];
    const rects = [[1, 8.3, 8, 0.5, "rgba(0,0,0,.35)"], [2, 7, 1, 1, c], [4, 7, 1, 1, c], [5, 7, 1, 1, c], [7, 7, 1, 1, c], [0, 4.6, 1, 1, c], [9, 4.6, 1, 1, c], [1, 2, 8, 5, c], [3, 3.2, 1, 1.6, "#1A1A1E"], [6, 3.2, 1, 1.6, "#1A1A1E"]].concat(HEADS[acc]);
    const art = Math.round(px * 0.84);
    const s = svg(art, { viewBox: "-2.2 -2.8 14.4 12", role: "img", "aria-label": alt }, rects.map(([x, y, w, hh, fill]) => ["rect", { x, y, width: w, height: hh, fill }]));
    s.removeAttribute("aria-hidden");
    box.replaceChildren(s);
  } };
}

// the eight demos, in the order of GOD_IDS; d is T[lang].d, m is T[lang].m
const DEMOS = [
  function ask(d) {
    const chips = d.ask.qa.map((x, i) => btn("chip", x[0], () => setF({ q: i, flip: fs.flip + 1 })));
    const p = h("p"), cites = h("div", "row"), card = h("div", "card ans", [p, cites], { "aria-live": "polite" });
    return { node: h("div", "win-body", [wt(d.ask.k, d.ask.t), h("div", "row", chips), card, h("span", "note", d.ask.note)]),
      update() {
        chips.forEach((c, i) => press(c, i === fs.q));
        const a = d.ask.qa[fs.q];
        p.textContent = a[1];
        cites.replaceChildren(...a[2].map((c) => h("span", "cite", [bookIcon(), c])));
        card.className = "card ans " + (fs.flip % 2 ? "pop1" : "pop0");
      } };
  },
  function talk(d) {
    const draft = h("div", "bub me draft", [h("div", "draft-tag", d.talk.draft), d.talk.reply]);
    const sent = [h("div", "bub me", d.talk.reply), h("div", "bub it", d.talk.back)];
    const ask = h("div", "act", [btn("btn btn-gold btn-sm", d.talk.send, () => setF({ sent: true }), { "data-k": "talk" }), h("span", "muted", d.talk.wait)]);
    const again = btn("btn btn-line btn-sm self-start", d.again, () => setF({ sent: false }), { "data-k": "talk" });
    return { node: h("div", "win-body", [wt(d.talk.k, d.talk.t), h("div", "bubs", [h("div", "bub it", d.talk.asks), draft].concat(sent)), ask, again]),
      update() { draft.hidden = ask.hidden = fs.sent; sent.forEach((n) => { n.hidden = !fs.sent; }); again.hidden = !fs.sent; } };
  },
  function flow(d) {
    const node = (cls, k, v) => h("div", cls, [h("span", "k", k), h("span", "v", v)]);
    const wire = () => h("span", "wire", null, { "aria-hidden": "true" });
    const nodes = d.flow.nodes.map(([k, v]) => node("node", k, v));
    const waiting = node("node gold", d.flow.waiting[0], d.flow.waiting[1]), done = node("node done pop0", d.flow.done[0], d.flow.done[1]);
    const ready = h("div", "card cta warn", [h("div", "cta-t", [h("b", null, d.flow.ready), h("span", null, d.flow.readyText)]), btn("btn btn-gold btn-sm", d.flow.approve, () => setF({ approved: true }), { "data-k": "flow" })]);
    const published = h("div", "card cta good pop0", [h("div", "cta-t", [h("b", null, d.flow.published), h("span", null, d.flow.publishedText)]), btn("btn btn-line btn-sm", d.again, () => setF({ approved: false }), { "data-k": "flow" })]);
    // the agents: three of them, each a face, a model, a version and a switch for your Claude Code
    const AG = [["Sonnet", 3, [0, 1, 2]], ["Haiku", 1, [1, 2, 1]], ["Haiku", 2, [2, 3, 3]]];
    const count = h("span", "count", null, { role: "status" });
    const agents = d.agents.list.map(([name, when], i) => {
      const f = face(52);
      f.paint(AG[i][2][0], AG[i][2][1], AG[i][2][2], d.agents.alt.replace("{n}", name));
      const state = h("span", "st-txt");
      const sw = btn("sw", h("i"), () => { const on = fs.on.slice(); on[i] = !on[i]; setF({ on }); }, { role: "switch", "aria-label": d.agents.label.replace("{n}", name) });
      const card = h("div", "agent", [
        h("div", "agent-top", [f.node, h("div", "cta-t", [h("b", null, name), h("span", null, when)])]),
        h("div", "agent-meta", [h("span", null, [d.agents.model + " ", h("b", null, AG[i][0])]), h("span", null, [d.agents.version + " ", h("b", null, String(AG[i][1]))]),
          h("span", "agent-sw", [h("span", null, d.agents.inClaude), state, sw])])
      ]);
      return { card, state, sw };
    });
    const node1 = h("div", null, [
      h("div", "win-body", [wt(d.flow.k, d.flow.t), h("div", "flow", [nodes[0], wire(), nodes[1], wire(), nodes[2], wire(), waiting, done]), ready, published]),
      h("div", "win-body sub", [h("div", "win-head", [wt(d.agents.k, d.agents.t), count]), ...agents.map((a) => a.card), h("span", "note", d.agents.note)])
    ]);
    return { node: node1, update() {
      waiting.hidden = ready.hidden = fs.approved; done.hidden = published.hidden = !fs.approved;
      agents.forEach((a, i) => {
        const on = fs.on[i];
        a.card.className = on ? "agent on" : "agent"; a.sw.className = on ? "sw on" : "sw";
        a.sw.setAttribute("aria-checked", String(on)); a.state.textContent = on ? d.on : d.off;
      });
      count.textContent = d.agents.count.replace("{n}", fs.on.filter(Boolean).length);
    } };
  },
  function work(d) {
    const card = (title, ref) => { const ci = h("span"); return { n: h("div", "wk", [h("div", "wk-t", title), h("div", "wk-m", [h("span", "dim", ref), ci])]), ci }; };
    const a = card(d.work.cards[0], "app #212"), b = card(d.work.cards[1], "app #216"), c = card(d.work.cards[2], "app #215");
    b.ci.textContent = d.work.failed; b.ci.className = "bad";
    c.ci.textContent = d.work.mainAgo; c.ci.className = "dim";
    const prN = h("span"), mainN = h("span");
    const pr = h("div", "col", h("div", "col-h pr", [d.work.inPr + " ", prN])), main = h("div", "col", h("div", "col-h main", [d.work.onMain + " ", mainN]));
    const merge = btn("btn btn-line btn-sm", null, () => setF({ merged: !fs.merged }));
    // a card that changes column is moved, so only it pops in; the ones that stay where they are do not blink
    const place = (col, list) => list.forEach((x, i) => { if (col.children[i + 1] !== x.n) col.insertBefore(x.n, col.children[i + 1] || null); });
    return { node: h("div", "win-body", [h("div", "win-head", [wt(d.work.k, d.work.t), merge]), h("div", "cols", [pr, main])]),
      update() {
        merge.textContent = fs.merged ? d.work.undo : d.work.merge;
        a.ci.textContent = fs.merged ? d.work.mainNow : d.work.passed; a.ci.className = "ok";
        const inPr = fs.merged ? [b] : [a, b], onMain = fs.merged ? [a, c] : [c];
        place(pr, inPr); place(main, onMain);
        prN.textContent = String(inPr.length); mainN.textContent = String(onMain.length);
      } };
  },
  function gate(d, m) {
    const it = marketItem(MARKET[0], m, "gate", () => setF({ open: !fs.open }));
    const go = h("a", "btn btn-line btn-sm self-start", [d.gate.market + " ", h("span", "arrow", "→", { "aria-hidden": "true" })], { href: "#marketplace" });
    return { node: h("div", "win-body", [wt(d.gate.k, d.gate.t), ...it.nodes, h("div", "card small muted", d.gate.vault), go]),
      update() { it.set(fs.open); } };
  },
  function fire(d) {
    const title = h("div", "display"), toggle = btn("btn btn-line btn-sm", null, () => setF({ down: !fs.down }));
    const row = () => { const lamp = h("span", "lamp", null, { "aria-hidden": "true" }), name = h("b"), detail = h("span"), state = h("span", "hl-st");
      return { lamp, name, detail, state, n: h("div", "card hl", [lamp, h("div", "cta-t", [name, detail]), state]) }; };
    const rows = [row(), row(), row()];
    return { node: h("div", "win-body", [h("div", "win-head", [h("div", "wt", [h("div", "eyebrow", d.fire.k), title]), toggle]), ...rows.map((r) => r.n), h("span", "note", d.fire.note)]),
      update() {
        title.textContent = fs.down ? d.fire.down : d.fire.ok;
        toggle.textContent = fs.down ? d.fire.restore : d.fire.simulate;
        [[d.fire.index[0], d.fire.index[1], true], [d.fire.sources[0], fs.down ? d.fire.sources[2] : d.fire.sources[1], !fs.down], [d.fire.conns[0], d.fire.conns[1], true]].forEach(([name, detail, ok], i) => {
          const r = rows[i];
          r.name.textContent = name; r.detail.textContent = detail;
          r.lamp.className = ok ? "lamp live" : "lamp off";
          r.state.textContent = ok ? d.fire.fine : d.fire.stopped; r.state.className = "hl-st " + (ok ? "ok" : "bad");
        });
      } };
  },
  function watch(d) {
    const title = h("div", "display"), text = h("span"), state = h("span", "st-txt");
    const eyes = Array.from({ length: 14 }, (x, i) => { const e = h("span", "eye"); e.style.transitionDelay = (i * 35) + "ms"; return e; });
    const sw = btn("sw", h("i"), () => setF({ awake: !fs.awake }), { role: "switch", "aria-label": d.watch.wake });
    return { node: h("div", "win-body", [h("div", "wt", [h("div", "eyebrow", d.watch.k), title]), h("div", "eyes", eyes, { "aria-hidden": "true" }),
      h("div", "card cta", [h("div", "cta-t", [h("b", null, d.watch.wake), text]), state, sw])]),
    update() {
      title.textContent = fs.awake ? d.watch.on : d.watch.off;
      text.textContent = fs.awake ? d.watch.onText : d.watch.offText;
      state.textContent = fs.awake ? d.on : d.off;
      sw.className = fs.awake ? "sw on" : "sw"; sw.setAttribute("aria-checked", String(fs.awake));
      eyes.forEach((e) => { e.className = fs.awake ? "eye on" : "eye"; });
    } };
  },
  function faceMaker(d) {
    const F = d.face;
    const faces = [[150, true], [48, false], [24, false]].map(([px, bob]) => face(px, bob ? "bob" : ""));
    const swatch = (cls, color, label, onClick) => { const i = h("i"); i.style.backgroundColor = color; return btn(cls, i, onClick, { "aria-label": label }); };
    const bodies = F.bodies.map((label, i) => swatch("swatch", BODY_COLORS[i], label, () => setF({ body: i })));
    const accs = F.accs.map((label, i) => btn("tab", label, () => setF({ acc: i })));
    const bgs = F.bgs.map((label, i) => swatch("swatch bgs", BG_COLORS[i], label, () => setF({ bg: i })));
    const opt = (label, cls, group, kids) => h("div", "opt", [h("span", "opt-l", label), h("div", cls, kids, { role: "group", "aria-label": group })]);
    return { node: h("div", "win-body", [wt(F.k, F.t),
      h("div", "faces", faces.map((f, i) => h("div", "face", [f.node, F.sizes[i]]))),
      opt(F.color, "sw-row", F.colorLabel, bodies), opt(F.head, "tabs", F.headLabel, accs), opt(F.bg, "sw-row", F.bgLabel, bgs),
      h("span", "note", F.note)]),
    update() {
      faces.forEach((f, i) => f.paint(fs.body, fs.acc, fs.bg, F.alt.replace("{s}", F.sizes[i].toLowerCase())));
      bodies.forEach((b, i) => press(b, i === fs.body)); accs.forEach((b, i) => press(b, i === fs.acc)); bgs.forEach((b, i) => press(b, i === fs.bg));
    } };
  }
];

// an item of the marketplace: the button that opens it and the list of what it asks for, shut until it is opened
function marketItem(it, m, key, toggle) {
  const L = it[lang], id = "facts-" + key;
  const hint = h("span", "item-hint", null, { "aria-hidden": "true" });
  const b = btn("item", [logo(it), h("span", "item-t", [h("b", null, [L.name + " ", h("small", null, m[it.kind].replace("{v}", it.version))]), h("span", null, L.text)]), hint], toggle, { "aria-controls": id, "data-k": key });
  const facts = h("dl", "facts card pop0", null, { id });
  L.facts.forEach(([k, v]) => facts.append(h("dt", null, k), h("dd", null, v)));
  return { nodes: [b, facts], set(open) { b.setAttribute("aria-expanded", String(open)); hint.textContent = open ? m.close : m.open; facts.hidden = !open; } };
}

// after a change the button that had the focus may have been swapped for its twin (send, then "show it again")
function refocus(root, key) {
  if (!key) return;
  const n = Array.prototype.find.call(root.querySelectorAll("[data-k]"), (x) => x.getAttribute("data-k") === key && x.offsetParent !== null);
  if (n && n !== document.activeElement) n.focus();
}
function setF(patch) {
  const key = document.activeElement && document.activeElement.getAttribute("data-k");
  Object.assign(fs, patch);
  demo.update();
  refocus($("demo"), key);
}

function buildPicks() {
  const box = $("picks");
  tabs = GOD_IDS.map((id, i) => {
    const b = btn("pick", [mascote(id, 60, { fundo: "nenhum" }), h("b"), h("small")], () => pickFeature(i), { role: "tab", id: "tab-" + id, "aria-controls": "panel" });
    box.appendChild(b);
    return b;
  });
  // arrows move along the row, Home and End go to its ends; the pick follows the focus
  box.addEventListener("keydown", (e) => {
    const n = GOD_IDS.length, k = e.key;
    const to = k === "ArrowRight" ? (fs.sel + 1) % n : k === "ArrowLeft" ? (fs.sel + n - 1) % n : k === "Home" ? 0 : k === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    pickFeature(to, true);
  });
}

// quiet: the pick came from the temple, which already announced the god, so the balloon here stays silent this once
function pickFeature(i, focus, quiet) {
  if (i !== fs.sel) {
    fs.sel = i;
    const live = $("show-talk");
    if (quiet) live.setAttribute("aria-live", "off");
    renderFeatures();
    if (quiet) setTimeout(() => live.setAttribute("aria-live", "polite"), 1000);
  }
  if (focus) tabs[i].focus();
}

function renderFeatures() {
  const t = T[lang], g = god(GOD_IDS[fs.sel]);
  tabs.forEach((b, i) => {
    const on = i === fs.sel;
    b.className = on ? "pick on" : "pick";
    b.setAttribute("aria-selected", String(on));
    b.tabIndex = on ? 0 : -1;
    b.children[1].textContent = god(GOD_IDS[i])[0];
    b.children[2].textContent = god(GOD_IDS[i])[1];
  });
  $("panel").setAttribute("aria-labelledby", "tab-" + GOD_IDS[fs.sel]);
  $("show-art").replaceChildren(mascote(GOD_IDS[fs.sel], 132, { fundo: "nenhum" }));
  $("show-who").textContent = g[0] + " · " + g[1];
  // every pick swaps wd0 and wd1, so the words come in again one by one even when the same class would stay
  fs.turn += 1;
  const wd = fs.turn % 2 ? "wd1" : "wd0";
  $("show-words").replaceChildren(...g[3].split(" ").map((w, i) => { const s = h("span", wd, w); s.style.animationDelay = (i * 38) + "ms"; return s; }));
  $("show-gains").replaceChildren(...g[4].map((x) => h("li", null, x)));
  demo = DEMOS[fs.sel](t.d, t.m);
  $("demo").replaceChildren(demo.node);
  demo.update();
}

// ---- the marketplace ----
let kindButtons = [];
function setM(patch) {
  const key = document.activeElement && document.activeElement.getAttribute("data-k");
  Object.assign(ms, patch);
  renderItems();
  refocus($("items"), key);
}
function renderItems() {
  const m = T[lang].m, list = $("items");
  kindButtons.forEach((b, i) => { b.textContent = m.kinds[i]; press(b, i === ms.kind); });
  const want = ["", "connection", "template", "plugin"][ms.kind];
  const shown = MARKET.map((it, i) => [it, i]).filter(([it]) => !want || it.kind === want);
  const kids = [];
  shown.forEach(([it, i]) => {
    const one = marketItem(it, m, "m" + i, () => setM({ open: ms.open === i ? -1 : i }));
    one.set(ms.open === i);
    kids.push(...one.nodes);
  });
  if (shown.some(([it]) => it.kind === "template")) kids.push(h("span", "note", m.templatesNote));
  if (!shown.length) kids.push(h("div", "card muted pop0", m.plugins));
  list.replaceChildren(...kids);
}
function buildMarket() {
  kindButtons = [0, 1, 2, 3].map((i) => btn("tab", null, () => setM({ kind: i })));
  $("kinds").append(...kindButtons);
}
function renderMarket() {
  renderItems();
  $("how").replaceChildren(...T[lang].m.how.map(([b, text]) => { const s = h("span"); inline(s, text); return h("li", null, [h("b", null, b), s]); }));
}

$("sel-go").addEventListener("click", () => {
  pickFeature(st.god);
  // the link scrolls to the features; the focus lands on the god it opened
  setTimeout(() => tabs[st.god].focus({ preventScroll: true }), 0);
});

// ---- the releases ----
// the notes are plain markdown from CHANGELOG.md: headings, bullets (with wrapped lines) and `code`; text goes in with textContent
function inline(parent, text) {
  text.split(/(`[^`]+`)/).forEach((part) => {
    if (/^`[^`]+`$/.test(part)) parent.appendChild(el("code", part.slice(1, -1))); else if (part) parent.appendChild(document.createTextNode(part));
  });
}
function notes(md) {
  let box = el("div", null, "notes"), ul = null, li = null, p = null;
  String(md || "").split(/\r?\n/).forEach((line) => {
    const h = /^#{2,4}\s+(.*)$/.exec(line), b = /^[-*]\s+(.*)$/.exec(line);
    if (h) { ul = li = p = null; box.appendChild(el("h4", h[1])); }
    else if (b) { if (!ul) { ul = el("ul"); box.appendChild(ul); } li = el("li"); inline(li, b[1]); ul.appendChild(li); p = null; }
    else if (!line.trim()) { ul = li = p = null; }
    else if (li) { li.appendChild(document.createTextNode(" ")); inline(li, line.trim()); }
    else if (p) { p.appendChild(document.createTextNode(" ")); inline(p, line.trim()); }
    else { p = el("p"); inline(p, line.trim()); box.appendChild(p); }
  });
  return box;
}

function renderReleases() {
  const t = T[lang];
  $("version-line").textContent = latestVersion ? t.requires + " · " + t.version.replace("{v}", latestVersion) : t.requires;
  const dl = $("download");
  dl.href = latestUrl || PAGE;
  $("download-text").textContent = latestVersion ? t.downloadVersion.replace("{v}", latestVersion) : t.download;
  $("download-note").textContent = (latestMB ? t.size.replace("{n}", latestMB) : "") + t.updates;
  // the one live part is the state line: loading (for screen readers only, the skeletons show it), a failure, or
  // no versions; the list itself is not live, so the release notes are never read out on their own
  const list = $("list"), state = $("list-state");
  const want = failed ? t.failed + " " + t.failedLink : releases === null ? t.loading : releases.length ? "" : t.empty;
  state.className = failed || (releases && !releases.length) ? "state" : "state sr";
  if (state.textContent !== want) {
    state.textContent = failed ? t.failed + " " : want;
    if (failed) { const a = el("a", t.failedLink); a.href = PAGE; a.rel = "noopener"; state.appendChild(a); }
  }
  list.textContent = "";
  if (failed || (releases && !releases.length)) return;
  if (releases === null) { list.appendChild(el("div", null, "skeleton")); list.appendChild(el("div", null, "skeleton")); return; }
  releases.forEach((r, i) => {
    const card = el("article", null, "rel"), h = el("h3", r.name || r.tag_name);
    if (i === 0) h.appendChild(el("span", t.latest, "tag"));
    if (r.published_at) {
      const tm = el("time", new Date(r.published_at).toLocaleDateString(t.locale, { year: "numeric", month: "long", day: "numeric" }));
      tm.setAttribute("datetime", r.published_at); h.appendChild(tm);
    }
    card.appendChild(h); card.appendChild(notes(r.body)); list.appendChild(card);
  });
}

// ---- the language ----
function render() {
  const t = T[lang];
  document.documentElement.lang = t.locale;
  document.querySelectorAll("[data-t]").forEach((n) => { const v = t[n.getAttribute("data-t")]; if (v) n.textContent = v; });
  document.querySelectorAll("[data-t-label]").forEach((n) => { const v = t[n.getAttribute("data-t-label")]; if (v) n.setAttribute("aria-label", v); });
  const sw = $("lang");
  sw.textContent = t.switchText; sw.setAttribute("aria-label", t.switchLabel); sw.setAttribute("lang", lang === "pt" ? "en" : "pt-BR");
  renderTemple();
  renderFeatures();
  renderMarket();
  renderReleases();
}

$("lang").addEventListener("click", () => { lang = lang === "pt" ? "en" : "pt"; render(); });
buildGods();
buildPicks();
buildMarket();
fillMascotes();
render();

// a section rises the first time it is seen. It is visible before that too, so nothing depends on this running.
if (typeof IntersectionObserver === "function") {
  const seen = new IntersectionObserver((list) => list.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("seen"); seen.unobserve(e.target); }
  }), { threshold: 0.05 });
  document.querySelectorAll(".rv").forEach((n) => seen.observe(n));
}

fetch(API, { headers: { Accept: "application/vnd.github+json" }, referrerPolicy: "no-referrer", credentials: "omit" })
  .then((r) => { if (!r.ok) throw new Error("status " + r.status); return r.json(); })
  .then((all) => {
    releases = (Array.isArray(all) ? all : []).filter((r) => !r.draft && !r.prerelease);
    const first = releases[0];
    if (first) {
      latestVersion = String(first.tag_name || "").replace(/^v/, "");
      (first.assets || []).forEach((a) => {
        if (/\.dmg$/.test(a.name || "") && safe(a.browser_download_url)) {
          latestUrl = a.browser_download_url;
          latestMB = a.size > 0 ? Math.round(a.size / 1e6) : null;
        }
      });
    }
    renderReleases();
  })
  .catch(() => { failed = true; renderReleases(); });
