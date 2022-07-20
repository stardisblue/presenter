// https://github.com/stardisblue/presenter v0.1.2 Copyright (c) 2021 Fati CHEN
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Katex = require('katex');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Katex__default = /*#__PURE__*/_interopDefaultLegacy(Katex);

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
const tex = createTex(Katex__default["default"]);

exports.createTex = createTex;
exports.tex = tex;
