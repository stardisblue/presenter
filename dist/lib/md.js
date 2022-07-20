// https://github.com/stardisblue/presenter v0.1.2 Copyright (c) 2021 Fati CHEN
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var marked = require('marked');
var hljs = require('highlight.js/lib/common');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hljs__default = /*#__PURE__*/_interopDefaultLegacy(hljs);

/**
 * Copyright 2018-2021 Observable, Inc.
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * https://github.com/observablehq/stdlib/blob/924d8f801075d29e595eb72fede8d2736f4da550/src/template.js */
function template(render, wrapper) {
    return function (strings, ..._args) {
        var string = strings[0], parts = [], part, root = null, node, nodes, walker, i, n, j, m, k = -1;
        // Concatenate the text using comments as placeholders.
        for (i = 1, n = arguments.length; i < n; ++i) {
            part = arguments[i];
            if (part instanceof Node) {
                parts[++k] = part;
                string += '<!--o:' + k + '-->';
            }
            else if (Array.isArray(part)) {
                for (j = 0, m = part.length; j < m; ++j) {
                    node = part[j];
                    if (node instanceof Node) {
                        if (root === null) {
                            parts[++k] = root = document.createDocumentFragment();
                            string += '<!--o:' + k + '-->';
                        }
                        root.appendChild(node);
                    }
                    else {
                        root = null;
                        string += node;
                    }
                }
                root = null;
            }
            else {
                string += part;
            }
            string += strings[i];
        }
        // Render the text.
        root = render(string);
        // Walk the rendered content to replace comment placeholders.
        if (++k > 0) {
            nodes = new Array(k);
            walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null, false);
            while (walker.nextNode()) {
                node = walker.currentNode;
                if (/^o:/.test(node.nodeValue)) {
                    nodes[+node.nodeValue.slice(2)] = node;
                }
            }
            for (i = 0; i < k; ++i) {
                if ((node = nodes[i])) {
                    node.parentNode.replaceChild(parts[i], node);
                }
            }
        }
        // Is the rendered content
        // … a parent of a single child? Detach and return the child.
        // … a document fragment? Replace the fragment with an element.
        // … some other node? Return it.
        return root.childNodes.length === 1
            ? root.removeChild(root.firstChild)
            : root.nodeType === 11
                ? ((node = wrapper()).appendChild(root), node)
                : root;
    };
}

// import 'highlight.js/styles/github.css';
const options = {
    highlight: function (code, language) {
        return hljs__default["default"].highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
};
marked.marked.setOptions(options);
const md = template(function (string) {
    const root = document.createElement('div');
    root.innerHTML = marked.marked.parse(string).trim();
    return root;
}, function () {
    return document.createElement('div');
});
const mdi = template(function (string) {
    const root = document.createElement('div');
    root.innerHTML = marked.marked.parseInline(string).trim();
    return root;
}, function () {
    return document.createElement('div');
});

exports.md = md;
exports.mdi = mdi;
