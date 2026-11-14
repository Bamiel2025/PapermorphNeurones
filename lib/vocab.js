/* Bibliothèque graphique partagée pour « La communication neuronale et l'action des drogues » (SVT 4e).
   Chargée après lib/engine.js et lib/lang-fr.js, avant audio/fr/timings.js. */
'use strict';

const C_SENS = '#f43f5e';
const C_MOT = '#34d399';
const C_CENTRE = '#38bdf8';
const C_NT = '#fbbf24';
const C_DRUG = '#c084fc';
const C_ALERT = '#fb7185';
const C_INK = '#f4f8fc';

(function neuSyncThemeColors() {
  COL.board = '#0f1e2e';
  COL.panel = '#14273b';
  COL.chalk = C_INK;
  COL.dim = '#a8c4da';
  COL.faint = '#496a88';
  COL.task = C_CENTRE;
  COL.good = C_MOT;
  COL.bad = C_SENS;
  COL.int = C_NT;
  COL.nat = C_DRUG;
  COL.whole = C_CENTRE;
})();

function neuText(p, str, x, y, t0, { size = 25, fill = COL.chalk, anchor = 'start', weight = 500, font = UI } = {}) {
  const e = T(p, str, { x, y, size, fill, anchor, weight, font, o: 0 });
  show(e, t0, .45);
  return e;
}

function neuTitle(p, str, y = 66, t0 = .05, sub = '') {
  const g = G(p, { o: 0 });
  T(g, str, { x: 800, y, size: 40, weight: 700, fill: COL.chalk, anchor: 'middle' });
  if (sub) T(g, sub, { x: 800, y: y + 36, size: 23, weight: 400, fill: COL.dim, anchor: 'middle' });
  show(g, t0, .45);
  return g;
}

function neuCard(p, x, y, w, h, { title = '', color = '#2c4c6b', fill = '#14273b', rx = 18, t0 = null, o = 1 } = {}) {
  const g = G(p, { x, y, o: t0 !== null ? 0 : o });
  mk('rect', { x: 0, y: 0, width: w, height: h, rx, fill, stroke: color, 'stroke-width': 2.5 }, g);
  if (title) {
    mk('rect', { x: 0, y: 0, width: w, height: 48, rx, fill: mix('#0f1e2e', color, .22) }, g);
    mk('rect', { x: 0, y: 30, width: w, height: 18, fill: mix('#0f1e2e', color, .22) }, g);
    mk('line', { x1: 0, y1: 48, x2: w, y2: 48, stroke: color, 'stroke-width': 1.5, opacity: .65 }, g);
    T(g, title, { x: w / 2, y: 33, size: 22, weight: 700, fill: color === '#2c4c6b' ? COL.chalk : color, anchor: 'middle' });
  }
  if (t0 !== null) show(g, t0, .45);
  return g;
}

function neuPill(p, cx, cy, label, color = C_CENTRE, t0 = null, { w = null, h = 42, size = 20 } = {}) {
  const width = w || Math.max(120, label.length * (size * .58) + 42);
  const g = G(p, { x: cx, y: cy, o: t0 !== null ? 0 : 1 });
  mk('rect', {
    x: -width / 2, y: -h / 2, width, height: h, rx: h / 2,
    fill: mix('#0f1e2e', color, .24), stroke: color, 'stroke-width': 2.2,
  }, g);
  T(g, label, { x: 0, y: size * .34, size, weight: 700, fill: color, anchor: 'middle' });
  if (t0 !== null) show(g, t0, .4);
  return g;
}

function neuArrow(p, x1, y1, x2, y2, t0, { color = COL.dim, sw = 4, curve = 0, dur = .55, dashed = false } = {}) {
  const g = G(p, { o: 1 });
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const cx = mx + nx * curve, cy = my + ny * curve;
  const d = curve ? `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
  const attrs = { stroke: color, 'stroke-width': sw };
  if (dashed) attrs['stroke-dasharray'] = '10 6';
  const ln = path(g, d, attrs, dashed ? { o: 0 } : { d: 0 });
  const tx = curve ? x2 - cx : dx, ty = curve ? y2 - cy : dy;
  const tlen = Math.hypot(tx, ty) || 1;
  const ux = tx / tlen, uy = ty / tlen;
  const ax = x2 - ux * 14, ay = y2 - uy * 14;
  const px = -uy * 8, py = ux * 8;
  const head = path(g, `M${ax + px} ${ay + py} L${x2} ${y2} L${ax - px} ${ay - py}`, { stroke: color, 'stroke-width': sw }, { o: 0 });
  if (dashed) {
    show(ln, t0, .35);
  } else {
    draw(ln, t0, dur);
  }
  show(head, t0 + Math.max(.05, dur - .14), .2);
  return g;
}

let _neuClipSeq = 0;

function neuDoc(p, href, x, y, w, h, {
  color = C_CENTRE, pad = 10, rx = 14, caption = '', sub = '', t0 = null, o = 1,
} = {}) {
  const clipId = `neu-doc-clip-${++_neuClipSeq}`;
  const g = G(p, { x, y, o: t0 !== null ? 0 : o });
  mk('rect', {
    x: 0, y: 0, width: w, height: h, rx,
    fill: '#ffffff', stroke: color, 'stroke-width': 2.5,
  }, g);
  const defs = mk('defs', {}, g);
  const cp = mk('clipPath', { id: clipId }, defs);
  mk('rect', { x: pad, y: pad, width: w - 2 * pad, height: h - 2 * pad, rx: Math.max(4, rx - 4) }, cp);
  mk('image', {
    href, x: pad, y: pad, width: w - 2 * pad, height: h - 2 * pad,
    preserveAspectRatio: 'xMidYMid meet', 'clip-path': `url(#${clipId})`,
  }, g);
  if (caption) T(g, caption, { x: w / 2, y: h + 30, size: 21, weight: 700, fill: COL.chalk, anchor: 'middle' });
  if (sub) T(g, sub, { x: w / 2, y: h + (caption ? 56 : 28), size: 17, fill: COL.dim, anchor: 'middle' });
  if (t0 !== null) show(g, t0, .45);
  return g;
}

function neuSpotlight(p, x, y, w, h, color = C_NT, t0 = .2, dur = .4, { rx = 10, fillOpacity = .12 } = {}) {
  const r = mk('rect', {
    x, y, width: w, height: h, rx,
    fill: color, 'fill-opacity': fillOpacity,
    stroke: color, 'stroke-width': 3.5, 'stroke-dasharray': '10 6',
    opacity: 0,
  }, p);
  show(r, t0, dur);
  return r;
}

function neuSchemaNode(p, cx, cy, w, h, label, {
  kind = 'rect', color = C_CENTRE, fill = null, sub = '', t0 = null, size = 21,
} = {}) {
  const g = G(p, { x: cx, y: cy, o: t0 !== null ? 0 : 1 });
  const bg = fill || mix('#0f1e2e', color, .22);
  if (kind === 'circle') {
    const r = Math.min(w, h) / 2;
    mk('circle', { r, fill: bg, stroke: color, 'stroke-width': 2.8 }, g);
  } else {
    mk('rect', {
      x: -w / 2, y: -h / 2, width: w, height: h, rx: kind === 'pill' ? h / 2 : 14,
      fill: bg, stroke: color, 'stroke-width': 2.5,
    }, g);
  }
  const lines = Array.isArray(label) ? label : [label];
  const lineH = size * 1.24;
  const startY = sub ? -lineH * (lines.length - 1) / 2 - 4 : -lineH * (lines.length - 1) / 2 + size * .32;
  lines.forEach((ln, idx) => {
    T(g, ln, { x: 0, y: startY + idx * lineH, size, weight: 700, fill: COL.chalk, anchor: 'middle' });
  });
  if (sub) T(g, sub, { x: 0, y: h / 2 + 24, size: 17, fill: color, anchor: 'middle' });
  if (t0 !== null) show(g, t0, .45);
  return g;
}

function neuNeuron(p, x, y, { scale = 1, color = C_CENTRE, t0 = .1, pulseAt = null, pulseColor = C_NT } = {}) {
  const g = G(p, { x, y, s: scale, o: t0 !== null ? 0 : 1 });
  // Soma étoilé + dendrites + long axone + bouton synaptique
  const bodyD = 'M-62 -52 L-46 -22 L-84 -16 L-50 4 L-76 38 L-36 28 L-24 62 L-4 32 L34 46 L42 12 L292 12 L318 28 L334 20 L308 0 L334 -20 L318 -28 L292 -12 L42 -12 L26 -46 L-12 -32 L-30 -64 Z';
  path(g, bodyD, { fill: mix('#0f1e2e', color, .26), stroke: color, 'stroke-width': 3.2, 'stroke-linejoin': 'round' });
  // Dendrites fines
  path(g, 'M-62 -52 L-82 -74 M-62 -52 L-44 -76 M-84 -16 L-108 -22 M-76 38 L-98 56 M-24 62 L-30 88', {
    stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round',
  });
  // Noyau
  mk('circle', { cx: -14, cy: 0, r: 16, fill: mix('#0f1e2e', color, .52), stroke: COL.chalk, 'stroke-width': 2 }, g);
  if (t0 !== null) show(g, t0, .45);
  if (pulseAt !== null) {
    const spike = mk('circle', { cx: 36, cy: 0, r: 9, fill: pulseColor, stroke: COL.chalk, 'stroke-width': 2, opacity: 0 }, g);
    show(spike, pulseAt, .15);
    tw(spike, { x: 268 }, pulseAt, 1.05, io);
    hide(spike, pulseAt + .95, .2);
  }
  return g;
}

function neuOscillo(p, x, y, w, h, { t0 = .2, mode = 'normal', label = '', color = C_NT } = {}) {
  const g = G(p, { x, y, o: 0 });
  mk('rect', { x: 0, y: 0, width: w, height: h, rx: 14, fill: '#08131f', stroke: '#2c4c6b', 'stroke-width': 2.5 }, g);
  const labelSpace = label ? 32 : 10;
  const traceH = Math.max(32, h - labelSpace - 10);
  const midY = Math.round(10 + traceH * .68);
  for (let gx = 40; gx < w; gx += 50) {
    mk('line', { x1: gx, y1: 10, x2: gx, y2: 10 + traceH, stroke: '#172e45', 'stroke-width': 1 }, g);
  }
  mk('line', { x1: 14, y1: midY, x2: w - 14, y2: midY, stroke: '#264663', 'stroke-width': 1.5, 'stroke-dasharray': '5 5' }, g);
  const amp = mode === 'altered' ? traceH * .24 : traceH * .58;
  const under = mode === 'altered' ? traceH * .12 : traceH * .18;
  let d;
  if (mode === 'altered') {
    d = `M20 ${midY} L${w * .24} ${midY} L${w * .31} ${midY - amp} L${w * .38} ${midY + under} L${w * .62} ${midY} L${w * .69} ${midY - amp * .8} L${w * .75} ${midY + under} L${w - 20} ${midY}`;
  } else {
    d = `M20 ${midY} L${w * .24} ${midY} L${w * .29} ${midY - amp} L${w * .35} ${midY + under} L${w * .41} ${midY} L${w * .58} ${midY} L${w * .63} ${midY - amp} L${w * .69} ${midY + under} L${w * .75} ${midY} L${w - 20} ${midY}`;
  }
  const trace = path(g, d, { stroke: color, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, { d: 0 });
  if (label) T(g, label, { x: w / 2, y: h - 10, size: 17, weight: 700, fill: color, anchor: 'middle' });
  show(g, t0, .35);
  draw(trace, t0 + .2, .9);
  return g;
}

function neuBlockBadge(p, cx, cy, color = C_ALERT, t0 = .2, r = 16) {
  const g = G(p, { x: cx, y: cy, o: 0 });
  mk('circle', { r, fill: mix('#0f1e2e', color, .35), stroke: color, 'stroke-width': 2.5 }, g);
  mk('line', { x1: -r * .45, y1: -r * .45, x2: r * .45, y2: r * .45, stroke: COL.chalk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  mk('line', { x1: -r * .45, y1: r * .45, x2: r * .45, y2: -r * .45, stroke: COL.chalk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  show(g, t0, .35);
  return g;
}

function neuSynapseStage(p, cx, cy, {
  mode = 'normal', t0 = .1, tMig = 1.0, tLib = 2.0, tFix = 3.0, scale = 1, labels = true,
} = {}) {
  const g = G(p, { x: cx, y: cy, s: scale, o: 0 });
  // Terminaison du neurone B (pré-synaptique, en haut)
  path(g, 'M-62 -215 L-62 -126 Q-148 -108 -148 -58 Q-148 -24 -78 -16 L78 -16 Q148 -24 148 -58 Q148 -108 62 -126 L62 -215 Z', {
    fill: mix('#0f1e2e', C_CENTRE, .2), stroke: C_CENTRE, 'stroke-width': 3,
  });
  // Corps cellulaire du neurone C (post-synaptique, en bas)
  path(g, 'M-150 215 L-150 112 Q-150 56 0 56 Q150 56 150 112 L150 215 Z', {
    fill: mix('#0f1e2e', C_MOT, .18), stroke: C_MOT, 'stroke-width': 3,
  });
  // Récepteurs sur la membrane de C
  [-74, -26, 26, 74].forEach(rx => {
    path(g, `M${rx - 10} 54 L${rx - 10} 64 Q${rx} 72 ${rx + 10} 64 L${rx + 10} 54`, {
      fill: '#0f1e2e', stroke: C_NT, 'stroke-width': 2.5,
    });
  });

  // Vésicules contenant les neurotransmetteurs
  const vesPositions = [[-66, -78], [0, -90], [66, -78]];
  vesPositions.forEach(([vx, vy], idx) => {
    const vg = G(g, { x: vx, y: vy, o: 1 });
    mk('circle', { r: 21, fill: mix('#0f1e2e', C_NT, .14), stroke: C_NT, 'stroke-width': 2.2 }, vg);
    [[-6, -5], [6, -4], [0, 7]].forEach(([dx, dy]) => {
      mk('circle', { cx: dx, cy: dy, r: 4, fill: C_NT }, vg);
    });
    if (mode === 'normal' || mode === 'alcool') {
      tw(vg, { x: vx * .88, y: -38 }, tMig + idx * .1, .75, io);
      hide(vg, tLib + idx * .08, .3);
    } else if (mode === 'cannabis') {
      tw(vg, { x: vx * .95, y: -64 }, tMig + idx * .1, .5, io);
    }
  });

  // Flèche message électrique entrant dans B
  neuArrow(g, 0, -200, 0, -134, t0 + .15, { color: C_SENS, sw: 5, dur: .5 });

  // Neurotransmetteurs libérés dans la fente synaptique
  const nts = [[-74, 18], [-26, 26], [26, 22], [74, 24]];
  if (mode === 'normal') {
    nts.forEach(([tx, ty], i) => {
      const dot = mk('circle', { cx: tx * .85, cy: -18, r: 6.5, fill: C_NT, stroke: COL.chalk, 'stroke-width': 1.2, opacity: 0 }, g);
      show(dot, tLib + i * .06, .2);
      tw(dot, { x: tx, y: 56 }, tFix - .45 + i * .06, .65, io);
    });
    neuArrow(g, 0, 108, 0, 194, tFix + .2, { color: C_MOT, sw: 5, dur: .55 });
  } else if (mode === 'cannabis') {
    // Drogue bloquante côté B (empêche la libération des vésicules)
    [-92, 92].forEach((bx, i) => {
      const wrap = G(g, { x: bx, y: -22, o: 0 });
      mk('polygon', { points: '0,-11 11,0 0,11 -11,0', fill: C_DRUG, stroke: COL.chalk, 'stroke-width': 1.5 }, wrap);
      show(wrap, tMig + i * .1, .35);
      neuBlockBadge(g, bx * .68, -42, C_ALERT, tLib + .1, 13);
    });
    const blkMsg = T(g, 'Libération empêchée', { x: 0, y: 150, size: 18, weight: 700, fill: C_ALERT, anchor: 'middle', o: 0 });
    show(blkMsg, tFix, .35);
  } else if (mode === 'alcool') {
    nts.forEach(([tx], i) => {
      const dot = mk('circle', { cx: tx * .85, cy: -18, r: 6.5, fill: C_NT, stroke: COL.chalk, 'stroke-width': 1.2, opacity: 0 }, g);
      show(dot, tLib + i * .06, .2);
      tw(dot, { x: tx, y: 26 }, tFix - .4 + i * .05, .45, io);
    });
    // Molécules bloquant les récepteurs sur C
    [-50, 0, 50].forEach((rx, i) => {
      const wrap = G(g, { x: rx, y: 56, o: 0 });
      mk('polygon', { points: '0,-11 11,0 0,11 -11,0', fill: C_DRUG, stroke: COL.chalk, 'stroke-width': 1.5 }, wrap);
      show(wrap, tMig + .2 + i * .08, .35);
    });
    neuBlockBadge(g, 0, 92, C_ALERT, tFix + .1, 15);
    const blkMsg = T(g, 'Réception bloquée', { x: 0, y: 150, size: 18, weight: 700, fill: C_ALERT, anchor: 'middle', o: 0 });
    show(blkMsg, tFix + .1, .35);
  }

  if (labels) {
    T(g, 'Neurone B (pré-synaptique)', { x: -162, y: -150, size: 17, weight: 700, fill: C_CENTRE, anchor: 'end' });
    T(g, 'Fente synaptique', { x: -162, y: 24, size: 17, weight: 700, fill: C_NT, anchor: 'end' });
    T(g, 'Neurone C (post-synaptique)', { x: -162, y: 150, size: 17, weight: 700, fill: C_MOT, anchor: 'end' });
  }

  show(g, t0, .4);
  return g;
}
