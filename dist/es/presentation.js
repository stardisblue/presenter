// https://github.com/stardisblue/presenter v0.1.2 Copyright (c) 2021 Fati CHEN
import { html } from 'htl';

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

export { Presentation, defaultFooter, resolve };
