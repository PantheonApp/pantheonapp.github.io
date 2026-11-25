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
    download: "Baixar para Mac", seeFeatures: "Ver os recursos",
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
    latest: "Mais nova", empty: "Ainda não há versões publicadas.",
    failed: "Não foi possível carregar a lista de versões agora. Veja todas na página de versões do GitHub.", failedLink: "Abrir a página de versões",
    footerTag: "Um conselho de IAs para a sua organização.", backTop: "Voltar ao topo",
    footer: "Esta página não usa rastreadores nem serviços externos, só a lista pública de versões do GitHub.",
    switchLabel: "Switch to English", switchText: "English", locale: "pt-BR",
    gods: {
      minerva: ["Minerva", "Conhecimento", "Leio o que a sua organização sabe, e digo de onde tirei.",
        "Eu guardo o que a sua organização sabe. Você pergunta em português, eu procuro nos seus documentos e respondo dizendo de onde tirei cada coisa. O seu Claude Code também me consulta antes de afirmar algo."],
      mercurio: ["Mercúrio", "Mensagens", "Levo o recado e volto com a resposta.",
        "Eu levo os recados. Aqui conversam as pessoas, os deuses e o Claude de cada um, tudo na mesma conversa. O seu Claude escreve em seu nome como rascunho, e só responde sozinho nas conversas que você aceitou."],
      vulcano: ["Vulcano", "Agentes e automações", "Forjo os agentes, e cada martelada vira uma versão.",
        "Eu forjo os agentes e as automações. Um agente é um especialista com instruções e versão. Uma automação junta os passos: lê um PR, chama um agente e para num cartão, esperando o seu sim antes de escrever lá fora."],
      hercules: ["Hércules", "Trabalho", "Doze trabalhos me deram, e levo cada um até o fim.",
        "Eu acompanho o trabalho até o fim. Mostro os seus PRs abertos e os que entraram na main, com a esteira, a revisão e a conversa do Claude que abriu cada um. Se um Claude está esperando você, eu aviso."],
      jano: ["Jano", "Conexões e acessos", "Uma face olha para dentro, a outra para fora, e sei quem entrou.",
        "Eu guardo as portas. Você liga o GitHub e outros serviços uma vez, e a chave fica no cofre. No marketplace há conexões prontas, e cada uma diz o que pede antes de entrar."],
      vesta: ["Vesta", "Status", "Guardo a chama: se algo apagar, você fica sabendo.",
        "Eu guardo a chama. Num lugar só você vê se o índice, as fontes e as conexões estão de pé. Se algo apagar, eu digo o que foi e desde quando."],
      argus: ["Argus", "Mac acordado", "Cem olhos, e nunca fecho todos de uma vez.",
        "Eu fico de vigia. Enquanto um deus trabalha, eu seguro o seu Mac acordado. Quando o trabalho termina, eu solto e ele volta a dormir."],
      dedalo: ["Dédalo", "Avatares", "Desenho o rosto de cada um, com régua e compasso.",
        "Eu desenho os rostos. Cada pessoa e cada agente ganha um avatar em pixel. Você escolhe um pronto ou me pede um sob medida, numa conversa."]
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
    download: "Download for Mac", seeFeatures: "See the features",
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
    latest: "Latest", empty: "No versions have been published yet.",
    failed: "The list of versions could not be loaded right now. See all of them on the GitHub releases page.", failedLink: "Open the releases page",
    footerTag: "A council of AIs for your organization.", backTop: "Back to top",
    footer: "This page uses no trackers and no outside services, only GitHub's public list of releases.",
    switchLabel: "Mudar para português", switchText: "Português", locale: "en",
    gods: {
      minerva: ["Minerva", "Knowledge", "I read what your organization knows, and tell you where I got it.",
        "I keep what your organization knows. You ask in your own words, I search your documents and answer saying where each thing came from. Your Claude Code also checks with me before it states something."],
      mercurio: ["Mercury", "Messages", "I carry the message and come back with the answer.",
        "I carry the messages. Here people, gods and each person's Claude talk, all in the same conversation. Your Claude writes on your behalf as a draft, and only answers on its own in the conversations you allowed."],
      vulcano: ["Vulcan", "Agents and automations", "I forge the agents, and every hammer blow becomes a version.",
        "I forge the agents and the automations. An agent is a specialist with instructions and a version. An automation strings the steps together: it reads a PR, calls an agent and stops at a card, waiting for your yes before writing anywhere outside."],
      hercules: ["Hercules", "Work", "They gave me twelve labors, and I see each one through.",
        "I follow the work to the end. I show your open PRs and the ones merged into main, with the checks, the review and the conversation of the Claude that opened each one. If a Claude is waiting for you, I let you know."],
      jano: ["Janus", "Connections and access", "One face looks in, the other looks out, and I know who came in.",
        "I guard the doors. You connect GitHub and other services once, and the key stays in the vault. The marketplace has ready connections, and each one says what it asks for before it comes in."],
      vesta: ["Vesta", "Status", "I keep the flame: if something goes out, you will know.",
        "I keep the flame. In one place you see whether the index, the sources and the connections are up. If something goes out, I tell you what it was and since when."],
      argus: ["Argus", "Mac awake", "A hundred eyes, and I never close them all at once.",
        "I keep watch. While a god works, I keep your Mac awake. When the work ends, I let go and it goes back to sleep."],
      dedalo: ["Daedalus", "Avatars", "I draw everyone's face, with ruler and compass.",
        "I draw the faces. Every person and every agent gets a pixel avatar. You pick a ready one or ask me for one made to measure, in a conversation."]
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
const st = { auto: true, paused: reduced(), talk: 0, phase: 0, god: 0, sel: 0 };
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
    // the god introduces himself here; the features section will follow the same pick
    b.addEventListener("click", () => set({ auto: false, god: i, sel: i }));
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
    const say = el("div", saying, "say " + side(speaker) + " pop0");
    say.setAttribute("role", "status");
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

setInterval(() => {
  if (!st.auto || st.paused) return;
  if (st.phase === 0) set({ phase: 1 });
  else set({ phase: 0, talk: (st.talk + 1) % TALKS.length });
}, 3200);

$("pause").addEventListener("click", () => set({ paused: !st.paused }));
$("resume").addEventListener("click", () => {
  set({ auto: true, paused: false, phase: 0 });
  // the button that had the focus is gone: the focus goes to the one that took its place
  $("pause").focus();
});
if (window.matchMedia) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.addEventListener) mq.addEventListener("change", () => { if (mq.matches) set({ paused: true }); });
}

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
  const list = $("list");
  list.textContent = "";
  if (failed) {
    const s = el("p", t.failed + " ", "state"), a = el("a", t.failedLink);
    a.href = PAGE; a.rel = "noopener"; s.appendChild(a); list.appendChild(s); return;
  }
  if (releases === null) { list.appendChild(el("div", null, "skeleton")); list.appendChild(el("div", null, "skeleton")); return; }
  if (!releases.length) { list.appendChild(el("p", t.empty, "state")); return; }
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
  renderReleases();
}

$("lang").addEventListener("click", () => { lang = lang === "pt" ? "en" : "pt"; render(); });
buildGods();
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
