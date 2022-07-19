// import 'katex/dist/katex.min.css';
import katex, { KatexOptions } from "katex";

function render(options?: KatexOptions) {
  return function (...args: [strings: TemplateStringsArray, ...args: any]) {
    const root = document.createElement("div");
    katex.render(String.raw.apply(String, args), root, options);
    return root.removeChild(root.firstChild!) as Element;
  };
}

function createTex() {
  return Object.assign(render(), { block: render({ displayMode: true }) });
}

export const tex = createTex();
