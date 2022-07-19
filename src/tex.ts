// import 'katex/dist/katex.min.css';

import Katex, { KatexOptions } from 'katex';

function render(katex: typeof Katex, options?: KatexOptions) {
  return function (...args: [strings: TemplateStringsArray, ...args: any]) {
    const root = document.createElement('div');
    katex.render(String.raw.apply(String, args), root, options);
    return root.removeChild(root.firstChild!) as Element;
  };
}

export function createTex(katex: typeof Katex) {
  return Object.assign(render(katex), {
    block: render(katex, { displayMode: true }),
  });
}

export const tex = createTex(Katex);
