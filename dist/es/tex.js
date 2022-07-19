// https://github.com/stardisblue/presenter v1.0.0 Copyright (c) 2021 Fati CHEN
import Katex from 'katex';

// import 'katex/dist/katex.min.css';
function render(katex, options) {
    return function (...args) {
        const root = document.createElement('div');
        katex.render(String.raw.apply(String, args), root, options);
        return root.removeChild(root.firstChild);
    };
}
function createTex(katex) {
    return Object.assign(render(katex), {
        block: render(katex, { displayMode: true }),
    });
}
const tex = createTex(Katex);

export { createTex, tex };
