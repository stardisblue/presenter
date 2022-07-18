import katex, { KatexOptions } from 'katex';
// import 'katex/dist/katex.min.css';

function render(options?: KatexOptions) {
  return function (
    _template: { raw: readonly string[] | ArrayLike<string> },
    ..._substitutions: any[]
  ) {
    const root = document.createElement('div');
    katex.render(String.raw.apply(String, arguments as any), root, options);
    return root.removeChild(root.firstChild!);
  };
}

function createTex() {
  return Object.assign(render(), { block: render({ displayMode: true }) });
}

export default createTex();
