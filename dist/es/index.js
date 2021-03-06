// https://github.com/stardisblue/presenter v0.1.2 Copyright (c) 2021 Fati CHEN
import { range } from 'd3-array';
import { html, svg } from 'htl';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';
import Katex from 'katex';

function focus() {
    this.focus();
}
/**Prevent default wrapper
 * @param {UIEvent} e
 */
function preventDefault(e) {
    // avoid opening context menu on right click
    e.preventDefault();
}

function navigation({ max = 0, previousKeys = ['ArrowUp', 'ArrowLeft', 'KeyH', 'KeyK', 'KeyW', 'KeyA'], nextKeys = ['ArrowDown', 'ArrowRight', 'KeyJ', 'KeyL', 'KeyS', 'KeyD'], stopPropagation = false, } = {}) {
    const keys = {
        previous: new Set(previousKeys),
        next: new Set(nextKeys),
    };
    const listeners = {
        previous: undefined,
        next: undefined,
        page: undefined,
    };
    const nav = {
        current: 0,
        max,
        previousPage(event) {
            const last = nav.current;
            if (last > 0) {
                if (stopPropagation && event)
                    event.stopPropagation();
                nav.current--;
                if (listeners.previous)
                    listeners.previous(nav.current, last, nav);
                if (listeners.page)
                    listeners.page(nav.current, last, nav);
            }
            return nav;
        },
        nextPage(event) {
            const last = nav.current;
            if (last < max - 1) {
                if (stopPropagation && event)
                    event.stopPropagation();
                nav.current++;
                if (listeners.next)
                    listeners.next(nav.current, last, nav);
                if (listeners.page)
                    listeners.page(nav.current, last, nav);
            }
            return nav;
        },
        collect(offset = 1) {
            const bounded = Math.max(Math.min(offset + nav.current, max - 1), 0);
            return range(nav.current + 1, bounded + 1, Math.sign(offset));
        },
        page(goto) {
            if (goto !== nav.current) {
                const last = nav.current;
                nav.current = Math.max(Math.min(goto, max - 1), 0);
                if (listeners.page)
                    listeners.page(nav.current, last, nav);
            }
            return nav;
        },
        bind: (el) => {
            el.addEventListener('pointerup', nav.events.onClick);
            el.addEventListener('keydown', nav.events.onKeyDown);
            el.addEventListener('contextmenu', preventDefault);
            el.addEventListener('mouseenter', focus);
            // $div.addEventListener('mouseleave', blur)
            el.focus();
            return nav;
        },
        on(type, listener) {
            listeners[type] = listener;
            return nav;
        },
        first() {
            if (listeners.page)
                listeners.page(0, 0, nav);
        },
        events: {
            onClick(event) {
                if (event.button === 2)
                    nav.previousPage(event);
                else if (event.button === 0)
                    nav.nextPage(event);
            },
            onKeyDown(event) {
                if (keys.previous.has(event.code))
                    nav.previousPage(event);
                else if (keys.next.has(event.code))
                    nav.nextPage(event);
            },
        },
    };
    return nav;
}

const defaultFooter = ({ page, nav }) => {
    const $number = html `<span>${page}</span>`;
    const $range = html `<input
    type="range"
    value=${page}
    step="1"
    min="1"
    max=${nav.max}
  />`;
    const $form = html `<form class="footer-form">
    ${$range} ${$number}/${nav.max}
  </form>`;
    $form.addEventListener('pointerup', (e) => e.stopPropagation());
    $form.addEventListener('change', (e) => {
        e.stopPropagation();
        nav.page($range.valueAsNumber - 1);
        $range.valueAsNumber = page;
        $number.innerHTML = '' + page;
    });
    $range.addEventListener('input', () => {
        $number.innerHTML = $range.value;
    });
    return $form;
};
function SimplePage({ template = 'full', ...props }, data) {
    var _a;
    const $title = html `<h2 class="page-title">
    ${resolve(props.title, data)}
  </h2>`;
    const $content = html `<div class="page-content"></div>`;
    const $footer = html `<div class="page-footer">
    ${resolve(template === 'title' ? props.footer : (_a = props.footer) !== null && _a !== void 0 ? _a : defaultFooter, data)}
  </div>`;
    const $background = html `<div class="page-background"></div>`;
    const $page = html `<div class="presenter-page"
    />${$background}
    <div class="page-container">${$title}${$content}${$footer}</div></div>`;
    $page.classList.toggle('page-centered', template === 'title');
    $content.classList.toggle('page-full', template === 'full');
    const $RenderSimplePage = Object.assign($page, {
        $title,
        $content,
        $footer,
        render() {
            const $el = resolve(props.content, data, $content);
            const $bg = resolve(props.background, data, $background);
            if ($el)
                $content.append($el);
            if ($bg)
                $background.append($bg);
            $RenderSimplePage.render = () => { };
        },
    });
    return $RenderSimplePage;
}
function Presentation({ lazy = 2, Template = SimplePage, } = {}) {
    const cache = new Map();
    const history = new Map();
    let steps = 0;
    const $container = html `<div class="presenter" tabindex="0" />`;
    return Object.assign($container, {
        load(newState, data) {
            //   console.log('load', cache.has(newState), data);
            let currentPage;
            if (cache.has(newState)) {
                // checks in cache
                currentPage = cache.get(newState);
            }
            else {
                const props = typeof newState === 'object' ? newState : newState(data);
                currentPage = Template(props, data);
                cache.set(newState, currentPage);
            }
            if (history.size > 0)
                // replace
                $container.insertBefore(currentPage, $container.firstChild);
            else
                $container.append(currentPage); // append
            currentPage.render();
            // add to history
            steps++;
            history.set(newState, steps);
            history.forEach((v, props) => {
                // delete expired
                if (v < steps - lazy) {
                    $container.removeChild(cache.get(props));
                    history.delete(props);
                    cache.delete(props);
                }
            });
        },
        preload(newState, data) {
            if (!cache.has(newState)) {
                // checks in cache
                const props = typeof newState === 'object' ? newState : newState(data);
                const page = Template(props, data);
                cache.set(newState, page);
                $container.append(page);
                page.render();
            }
            history.set(newState, steps); // update ranking in history
        },
    });
}
function resolve(res, ...rest) {
    if (!res)
        return null;
    if (typeof res === 'string')
        return res;
    if (res instanceof Text)
        return res;
    if (res instanceof DocumentFragment)
        return res;
    if (res instanceof Element)
        return res;
    if (res.node && typeof res.node === 'function')
        return res.node();
    return resolve(res(...rest), ...rest);
}

function create(container, pages) {
    const pres = Presentation({ lazy: 2 });
    container.append(pres);
    const nav = navigation({ max: pages.length })
        .on('page', function (page, _prev, nav) {
        pres.load(pages[page], { page: page + 1, nav });
        nav
            .collect(2)
            .forEach((v, i) => pres.preload(pages[v], { page: page + 1, nav }));
    })
        .bind(pres);
    nav.first();
    return { pres, nav };
}

const stub$1 = html;

const stub = svg;

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
        // ??? a parent of a single child? Detach and return the child.
        // ??? a document fragment? Replace the fragment with an element.
        // ??? some other node? Return it.
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
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
};
marked.setOptions(options);
const md = template(function (string) {
    const root = document.createElement('div');
    root.innerHTML = marked.parse(string).trim();
    return root;
}, function () {
    return document.createElement('div');
});
const mdi = template(function (string) {
    const root = document.createElement('div');
    root.innerHTML = marked.parseInline(string).trim();
    return root;
}, function () {
    return document.createElement('div');
});

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

export { Presentation, create, createTex, defaultFooter, stub$1 as html, md, mdi, navigation, resolve, stub as svg, tex };
