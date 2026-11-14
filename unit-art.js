'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 19, cls = '', anchor = 'middle') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Unité 1 : Stimulus -> organe sensoriel -> centres nerveux -> axone & potentiel d'action
    reset(
      `<circle class="t breathe" cx="122" cy="94" r="24" fill="none" stroke="currentColor" stroke-width="2.5" style="--k:${k++}"/>` +
      P('M152 94H246', 'a') +
      P('M236 86L246 94L236 102', 'a') +
      P('M262 62H362V126H262Z', '') +
      P('M286 94H338', 'a') +
      P('M374 94H462', '') +
      P('M414 94L424 62L434 114L444 94', 'a') +
      `<circle class="t breathe" cx="484" cy="94" r="18" fill="none" stroke="currentColor" stroke-width="2.5" style="--k:${k++}"/>` +
      Tx(122, 34, 'sensoriel', 19, 'a') +
      Tx(312, 34, 'cerveau · moelle', 19, 'a') +
      Tx(458, 34, 'potentiel électrique', 19, 'a')
    ),
    // Unité 2 : Synapse chimique (vésicules + fente) & blocage par les drogues
    reset(
      P('M96 48V74Q56 84 56 104Q56 122 146 122Q236 122 236 104Q236 84 196 74V48', '') +
      `<circle class="t breathe" cx="116" cy="98" r="10" fill="none" stroke="currentColor" stroke-width="2.2" style="--k:${k++}"/>` +
      `<circle class="t breathe" cx="146" cy="100" r="10" fill="none" stroke="currentColor" stroke-width="2.2" style="--k:${k++}"/>` +
      `<circle class="t breathe" cx="176" cy="98" r="10" fill="none" stroke="currentColor" stroke-width="2.2" style="--k:${k++}"/>` +
      P('M60 164Q146 142 232 164', '') +
      P('M272 110H366', 'faint') +
      P('M356 102L366 110L356 118', 'faint') +
      `<circle class="t breathe" cx="446" cy="110" r="34" fill="none" stroke="currentColor" stroke-width="3" style="--k:${k++}"/>` +
      P('M430 94L462 126M430 126L462 94', 'a') +
      Tx(146, 30, 'vésicules · synapse', 19, 'a') +
      Tx(446, 30, 'drogues · perturbation', 19, 'a')
    ),
  ];
})();
