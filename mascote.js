// The gods as pixel mascots, drawn as SVG rects: a port of the app's Mascote (web/src/components/Mascote.tsx) at rest,
// same squat 8x5 body, same costumes and colours. Dédalo is the app's `dedalo` avatar preset in its still pose.
// The gestures are CSS animations in site.css (.m-*), and they all stop for reduced motion.
const NS = "http://www.w3.org/2000/svg";

const BODY = "#D97757", DARK = "#1A1A1E", PAPER = "#F4EFE4", RED = "#C8453A", GOLD = "#D9B45A", WOOD = "#A07C52";
const LION = "#D2A257", MANE = "#8A5F2C", CLUB = "#8B6238", KNOT = "#5E3F22";
const ASH = "#C9C3B6", BUTTER = "#F6D27A";

/** The tile behind each god, the app's --tint-* tokens. */
export const TINTS = {
  minerva: "#1C2E2A", mercurio: "#1E2A3A", vulcano: "#33261C", vesta: "#2B1F33",
  jano: "#2A2416", argus: "#2A1F1A", dedalo: "#22262E", hercules: "#3A1A20"
};

function node(tag, attrs, kids) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  (kids || []).forEach((c) => c && e.appendChild(c));
  return e;
}
const r = (x, y, w, h, fill) => node("rect", { x, y, width: w, height: h, fill });
const path = (d, fill) => node("path", { d, fill, "fill-rule": "evenodd" });
// a part that moves: its keyframes and origin live in site.css under the class
const g = (cls, kids, delay) => {
  const e = node("g", cls ? { class: cls } : {}, kids);
  if (delay) e.style.animationDelay = delay;
  return e;
};

function costume(god, size) {
  switch (god) {
  case "minerva": return [
    r(1, 1.3, 8, 1, GOLD), r(2, 0.4, 6, 0.9, GOLD), r(4.6, 2.3, 0.8, 1.2, GOLD), r(4.5, -0.3, 1, 0.7, GOLD),
    g("m-minerva-plume", [r(2.5, -1.5, 5, 1.2, RED)]),
    g("m-minerva-scroll", [r(9.3, 3.4, 1.9, 2.6, PAPER), r(9.6, 4, 1.3, 0.3, DARK), r(9.6, 4.7, 1.3, 0.3, DARK), r(9.6, 5.4, 0.8, 0.3, DARK)])
  ];
  case "mercurio": return [
    r(2, 0.5, 6, 0.9, "#AFC3DA"), r(1, 1.3, 8, 0.7, "#AFC3DA"),
    g("m-mercurio-wing-l", [r(-0.9, -0.6, 2.3, 0.6, PAPER), r(-0.5, 0, 1.9, 0.6, PAPER), r(0, 0.6, 1.4, 0.6, PAPER)]),
    g("m-mercurio-wing-r", [r(8.6, -0.6, 2.3, 0.6, PAPER), r(8.6, 0, 1.9, 0.6, PAPER), r(8.6, 0.6, 1.4, 0.6, PAPER)]),
    g("m-mercurio-letter", [r(9.3, 4, 2.2, 1.5, PAPER), r(10.15, 4.5, 0.5, 0.5, RED)])
  ];
  case "vulcano": return [
    r(1, 2, 8, 0.6, "#6B5238"), r(2.5, 5.5, 5, 1.5, "#6B5238"),
    g("m-vulcano-hammer", [r(9.55, 2.4, 0.6, 3.4, WOOD), r(8.7, 1.2, 2.3, 1.3, "#A9AFB8")])
  ];
  case "vesta": return [
    r(1, 1.4, 8, 0.8, PAPER), r(0.5, 2, 0.5, 2.2, PAPER), r(9, 2, 0.5, 1.2, PAPER), r(9.6, 3.6, 0.6, 2.6, WOOD),
    g("m-vesta-flame", [r(9.2, 2, 1.4, 1.6, "#E8A54B"), r(9.6, 1.1, 0.6, 0.9, "#E8A54B"), r(9.6, 2.6, 0.6, 0.8, "#F6D27A")])
  ];
  case "jano": return [
    r(4.85, 2, 0.3, 5, "#B35A3E"),
    r(1, 1.5, 8, 0.6, "#8DB57A"), r(1.5, 0.9, 1, 0.6, "#8DB57A"), r(3.5, 0.9, 1, 0.6, "#8DB57A"), r(5.5, 0.9, 1, 0.6, "#8DB57A"), r(7.5, 0.9, 1, 0.6, "#8DB57A"),
    g("m-jano-key", [r(9.2, 2.4, 1.4, 1.2, GOLD), r(9.65, 2.75, 0.5, 0.5, TINTS.jano), r(9.65, 3.6, 0.5, 2.6, GOLD), r(10.15, 5, 0.6, 0.4, GOLD), r(10.15, 5.7, 0.5, 0.4, GOLD)])
  ];
  case "argus": return [
    // the four extra eyes are too fine to read below 24 px, so they only show from there up
    ...(size >= 24 ? [[1.3, 3.3, 1.3], [7.9, 3.3, 1.3], [2.5, 5.3, 1.2], [6.7, 5.3, 1.2]].map(([x, y, h], i) => g("m-argus-eye", [r(x, y, 0.8, h, DARK)], (i * 1.5) + "s")) : []),
    r(9.7, 1.4, 0.6, 6.4, WOOD), r(9.7, 0.8, 1.6, 0.6, WOOD), r(10.9, 1.2, 0.5, 1, WOOD),
    r(-1.9, 3.6, 1.7, 1.7, PAPER), r(-0.2, 4, 0.4, 0.8, PAPER), r(-1.9, 3.6, 1.7, 0.4, "#5A3A22"),
    ...[[-1.5, 2.5, 0], [-0.8, 2.2, 0.6]].map(([x, y, d]) => g("m-argus-steam", [r(x, y, 0.3, 0.8, ASH)], d + "s"))
  ];
  case "hercules": return [
    // the lion's skin worn as a hood: its ears, its eyes and muzzle over the brow, its teeth and mane framing the face
    r(0.7, 0.9, 8.6, 1.3, LION), r(1, 0.2, 1.3, 0.7, LION), r(7.7, 0.2, 1.3, 0.7, LION), r(1.3, 0.45, 0.7, 0.45, MANE), r(8, 0.45, 0.7, 0.45, MANE),
    r(3, 1.25, 0.7, 0.4, DARK), r(6.3, 1.25, 0.7, 0.4, DARK), r(4.6, 1.55, 0.8, 0.5, MANE),
    r(2.1, 2.2, 0.5, 0.6, PAPER), r(7.4, 2.2, 0.5, 0.6, PAPER),
    r(0.4, 2, 0.6, 2.4, MANE), r(9, 2, 0.6, 2.4, MANE),
    // the forepaws tied on the chest
    r(3.5, 6.1, 1.3, 0.9, LION), r(5.2, 6.1, 1.3, 0.9, LION), r(4.8, 6.3, 0.4, 0.5, MANE),
    g("m-hercules-club", [r(9.8, 3.4, 0.6, 3.2, CLUB), r(9.45, 0.8, 1.3, 2.7, CLUB), r(9.75, 0.5, 0.7, 0.3, CLUB), r(9.45, 1.4, 0.4, 0.4, KNOT), r(10.35, 2.3, 0.4, 0.4, KNOT)])
  ];
  }
  return [];
}

// Dédalo's wings go behind the body; the belt and the compass in front. Pin, needle and lead only from 48 px up.
function dedaloBack() {
  return [
    g("m-dedalo-wing-l", [path("M -2.2 1.9 L 1 1.9 L 1 2.5 L -2.2 2.5 Z M -2 2.5 L 1 2.5 L 1 3.1 L -2 3.1 Z M -1.6 3.1 L 1 3.1 L 1 3.7 L -1.6 3.7 Z M -1.2 3.7 L 1 3.7 L 1 4.3 L -1.2 4.3 Z", PAPER), r(0.4, 1.9, 0.6, 2.4, BUTTER)]),
    g("m-dedalo-wing-r", [path("M 9 1.9 L 12.2 1.9 L 12.2 2.5 L 9 2.5 Z M 9 2.5 L 12 2.5 L 12 3.1 L 9 3.1 Z M 9 3.1 L 11.6 3.1 L 11.6 3.7 L 9 3.7 Z M 9 3.7 L 11.2 3.7 L 11.2 4.3 L 9 4.3 Z", PAPER), r(9, 1.9, 0.6, 2.4, BUTTER)])
  ];
}
function dedaloFront(size) {
  const fine = size >= 48;
  return [
    path("M 3.2 5.9 L 6.8 5.9 L 6.8 6.5 L 6.2 6.5 L 6.2 7 L 3.8 7 L 3.8 6.5 L 3.2 6.5 Z", ASH),
    g("m-dedalo-compass", [
      r(10.3, 4.2, 0.5, 0.5, ASH), r(10, 4.7, 1.1, 0.7, ASH), fine && r(10.4, 4.85, 0.3, 0.3, BUTTER),
      path("M 9.95 5.4 L 10.55 5.4 L 10.55 6.2 L 9.95 6.2 Z M 9.7 6.2 L 10.3 6.2 L 10.3 7 L 9.7 7 Z M 9.45 7 L 10.05 7 L 10.05 7.8 L 9.45 7.8 Z", ASH),
      path("M 10.55 5.4 L 11.15 5.4 L 11.15 6.2 L 10.55 6.2 Z M 10.8 6.2 L 11.4 6.2 L 11.4 7 L 10.8 7 Z M 11.05 7 L 11.65 7 L 11.65 7.8 L 11.05 7.8 Z", ASH),
      fine && r(9.55, 7.8, 0.35, 0.6, PAPER), r(11.1, 7.8, 0.55, 0.5, BUTTER), fine && r(11.25, 8.3, 0.25, 0.35, ASH)
    ])
  ];
}

/**
 * One god, `size` px square. With `fundo: "nenhum"` it stands without its tile, in a scene of its own (the temple).
 * Decorative by default, since the name always sits beside it; pass `label` for a figure that stands alone.
 */
export function mascote(god, size, opts) {
  const o = opts || {};
  const box = document.createElement("span");
  box.className = "mascote";
  box.setAttribute("data-god", god);
  box.style.width = size + "px";
  box.style.height = size + "px";
  if (o.fundo !== "nenhum") box.style.backgroundColor = TINTS[god] || TINTS.vulcano;
  const px = Math.round(size * 0.76);
  const svg = node("svg", { width: px, height: px, viewBox: "-2.2 -3.4 14.4 12.6", focusable: "false" });
  if (o.label) { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", o.label); } else svg.setAttribute("aria-hidden", "true");
  const dedalo = god === "dedalo";
  const [eyeL, eyeR] = god === "jano" ? [2, 7] : [3, 6];
  svg.appendChild(r(1, 8.3, 8, 0.5, dedalo ? "rgba(26,26,30,.35)" : "rgba(0,0,0,.35)"));
  svg.appendChild(g("m-bob", [
    ...(dedalo ? dedaloBack() : []),
    r(2, 7, 1, 1, BODY), r(5, 7, 1, 1, BODY), r(4, 7, 1, 1, BODY), r(7, 7, 1, 1, BODY),
    r(0, 4.6, 1, 1, BODY), r(9, 4.6, 1, 1, BODY),
    r(1, 2, 8, 5, BODY),
    ...(dedalo ? dedaloFront(size) : []),
    g("m-blink", [r(eyeL, 3.2, 1, 1.6, DARK), r(eyeR, 3.2, 1, 1.6, DARK)]),
    ...(dedalo ? [] : costume(god, size))
  ]));
  box.appendChild(svg);
  return box;
}

/** Fills every `[data-mascote]` placeholder of the page: data-mascote is the god, data-tamanho the size. */
export function fillMascotes(root) {
  (root || document).querySelectorAll("[data-mascote]").forEach((slot) => {
    slot.textContent = "";
    slot.appendChild(mascote(slot.getAttribute("data-mascote"), Number(slot.getAttribute("data-tamanho")) || 64, { fundo: slot.getAttribute("data-fundo") || undefined }));
  });
}
