# Presenter

> A weird way to make presentations, with lazy loading and js

The presenter is made of 3 main components:

1. Presentation
2. navigation
3. Renderers

### Presentation

Contains all the slides of the presentation, it is responsible for loading and displaying the different pages.

### navigation

Allows for easier navigation, it can bind itself to an element with keyboard and mouse events. Mostly used with Presentation.

### Renderers

> A renderer is a function that convert a given object to an Element

Different renderers are available:

- `md` for markdown (and `mdi` for inline markdown, using marked)
- `html` and `svg` (using htl)
- `tex` for LaTex formulas (using KaTex)

## Motivations

For my [thesis presentation](https://github.com/stardisblue/thesis-presentation) I wanted to include some animations, since there was a lot of code involved, and my previous experience of in browser [presentations](https://observablehq.com/@stardisblue/agora-presentation-labri?collection=@stardisblue/agora) has thought me that having all slides loaded was a bad idea. Since template functions are incredibly useful in reducing overall code overload, This was something I wanted to dig into.

It is still by no means perfect, particularely for in-between slides animations but we're getting there :).

## Usage

### Browser

[![](https://data.jsdelivr.com/v1/package/gh/stardisblue/presenter/badge)](https://www.jsdelivr.com/package/gh/stardisblue/presenter)

```html
<div id="container"></div>
<!-- highlight.js -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css"
  crossorigin="anonymous"
/>
<!-- katex -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
  crossorigin="anonymous"
/>
<!-- presenter -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/stardisblue/presenter@latest/dist/index.min.css"
  crossorigin="anonymous"
/>
<script
  src="https://cdn.jsdelivr.net/gh/stardisblue/presenter@latest/dist/index.min.js"
  crossorigin="anonymous"
></script>
<script>
  presenter.create(document.querySelector('#container'), [
    {
      title: 'Hello World',
      content: presenter.md`this is _presenter_`,
    },
  ]);
</script>
```

### ES6

```js
import { create, md } from 'presenter';

const presentation = create(document.querySelector('#container'), [
  {
    title: 'Hello World',
    content: md`
this is _presenter_
    `,
  },
]);
```

---

## Pages

A page is an object composed of a title, a content a footer and a background. All the attributes are optional, a footer is defined by default.

It is designed to support Renderers such as markdown.

```js
import { md } from 'presenter';

const page = {
  type: 'title',
  title: 'Hello World',
  content: md`
this is a markdown content
  `,
};
```

There is 2 types of pages, either:

- `full` the title is at the top, the footer at the bottom, the content takes all the remaining space
- `title`, everything is vertically centered, the footer is displayed only if defined (no footer by default).

The page can either be a PageObject or a function that returns a PageObject.
This function will be called during preload or load. The page number and the navigation will be passed to this function as attributes.

```js
const page = ({ page, nav }) => ({
  title: 'Hello World',
  content: md`this is a markdown content, the page is ${page}`,
});
```

Each attribute of a PageObject can also be lazily defined:

```js
const page = {
  title: 'Hello World',
  content: ({ page, nav }) =>
    md`this is a markdown content, the page is ${page}`,
};
```

For content and background, the parent DOM element is also passed as a parameter:

```js
const page = {
  title: 'Hello World',
  content: ({ page }, el) =>
    md`**markdown** content, the page is ${page}, I will be rendered inside el`,
  // equivalent to
  content: ({ page }, el) => {
    el.append(
      md`**markdown** content, the page is ${page}, I will be rendered inside el`
    );
  },
};
```

This allows to interact with the el to retrieve it's dimensions before adding the content.

---

## Renderers

Several renderers are passed for ease of use, but other renderers can be used as long as they return a DOM Element.

### HTML and SVG

Source: [html](https://github.com/stardisblue/presenter/blob/main/src/html.ts), [svg](https://github.com/stardisblue/presenter/blob/main/src/svg.ts)

Implemented by [htl](https://github.com/observablehq/htl). Exposed for convienience.

```js
presenter.html`<h3>Hello</h3>`;
// => HTMLHeadingElement
presenter.html.fragment`<h3>Hello</h3>`;
// => HTMLFragment
presenter.svg`<g>Hello</g>`;
// => SVGGElement
```

See more examples and documentation: [htl](https://github.com/observablehq/htl)

### Tex [<>](https://github.com/stardisblue/presenter/blob/main/src/tex.ts)

Uses [$\KaTeX$](https://katex.org/), decorated into a template string.

```js
presenter.tex`\KaTeX`;
```

For full width functions use:

```js
presenter.tex.block`\KaTeX`;
```

> **Note**: requires KaTeX css:
>
> ```html
> <link
>   rel="stylesheet"
>   href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
>   crossorigin="anonymous"
> />
> ```

### Markdown [<>](https://github.com/stardisblue/presenter/blob/main/src/md.ts)

Implemented by [marked](https://marked.js.org/) and [highlight.js](https://highlightjs.org/) and a little bit of magic.

```js
presenter.md`Hello world`;
// => <p>Hello world</p>
presenter.mdi`Hello world`;
// => <span>Hello World</span>
```

The magic part allows to include various objects directly without any conflict. This behaviour is the same as in [observablehq/stdlib](https://github.com/observablehq/stdlib#markdown), from which some of the code is taken from.

For example to inline `tex`:

```js
import { md, tex } from 'presenter';
md`Hello World ${tex`\KaTeX`}`;
```

> **Note**: required for syntax highlighting of code blocks:
>
> ```html
> <link
>   rel="stylesheet"
>   href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css"
>   crossorigin="anonymous"
> />
> ```

---

## API Documentation

**create**( _el, pages_ ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/create.ts#L5)

A quick way to bind the slides to an DOM element

```js
import { create, md } from 'presenter';
const { pres, nav } = create(document.querySelector('#container'), [
  {
    title: 'Hello World',
    content: md`
this is _presenter_
    `,
  },
]);
```

Returns an object containing `pres` the _presentation_ and `nav` the _navigation_.

### Presentation

**Presentation**( _options_ ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/presentation.ts#L98)

Creates the presentation container and is used to load pages. It tracks the number of preloaded slides and will remove them when a given treshold is reached.

_options_:

- `lazy` (default: 2) number of cached pages
- `Template` (default: `SimplePage`) function used to create a page (see `Page` below).

_presentation_.**load**( _page_[, _data_] ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/presentation.ts#L112)

Loads the given page and passes the data to it. It will put this page as the first element of the presentation container.

_presentation_.**preload**( _page_[, _data_] ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/presentation.ts#L142)

Load the given page and passes data to it, It will append this page to the presentation container.

### Navigation

**navigation**( _options_ ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L18)

Creates a _navigation_ that allows for travelling through page numbers. It can safely be bound to a DOM Element and will track the current page number and when it has changed.

```js
const nav = navigation({ max: 10 })
  .on('page', (page) => console.log(page))
  .bind(document.querySelector('#presenter'))
  .first();
```

_options_:

- `max` (default: 0) the total number of pages
- `previousKeys` (default: <kbd>↑</kbd>, <kbd>←</kbd>, <kbd>h</kbd>, <kbd>k</kbd>, <kbd>w</kbd>, <kbd>a</kbd>) the keyboard letters to previous page
- `nextKeys` (default: <kbd>↓</kbd>, <kbd>→</kbd>, <kbd>j</kbd>, <kbd>l</kbd>, <kbd>s</kbd>, <kbd>d</kbd>) the keywboard letter to next page
- `stopPropagation` (default: `false`) stops the event propagation.

> Keys use [`KeyboardEvent.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

_navigation_.**current** current page number

_navigation_.**max** total number of pages

_navigation_.**events** exposes `onClick` and `onKeyDown` function for advanced usecases.

_navigation_.**previousPage**( [_event_] ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L49)

Sets navigation to previous page. If _event_ is passed, it will stop the event propagation depending on the `stopPropagation` option

_navigation_.**nextPage**( [_event_] ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L59)

Sets navigation to next page .If _event_ is passed, it will stop the event propagation depending on the `stopPropagation` option

_navigation_.**collect**( [_offset_] ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L69)

Will return an array containing the `offset` next page numbers, in respect to 0 and `max` bounds. If offset is omitted, it defaults to 1.

_navigation_.**page**( _goto_ ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L73)

Sets the navigation to the given number (in respect to 0 and `max`). If `goto` is equal to _navigation_.current, it will be ignored.

_navigation_.**bind**( _el_ ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L81)

Bind the navigation (`previousPage`, `nextPage`) to `el`. The navigation events include `pointerup` (right and left clicks), `keydown` (`previousKeys` and `nextKeys`). It will also automatically suppress contextmenu and will focus `el` immediatly and on `mouseenter`.

_navigation_.**on**( _type_, _listener_ ) · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L91)

Will trigger _listener_ on the given _type_ event.

- `previous`: triggered when _navigation_.previousPage is called
- `next` : triggered when _navigation_.nextPage is called
- `page`: triggered when the page changes (_navigation_.page, _navigation_.previousPage, _navigation_.nextPage, _navigation_.first)

_navigation_.**first**() · [<>](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L95)

Helper that goes on the first pages. Used to initialize the navigation.

🚧 still not finished :(
