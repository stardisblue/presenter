# Presenter

> A weird way to make presentations, with lazy loading and pure js

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

## Usage

## Browser

```html
<div id="#container"></div>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css"
  integrity="sha256-Oppd74ucMR5a5Dq96FxjEzGF7tTw2fZ/6ksAqDCM8GY="
  crossorigin="anonymous"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
  integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
  crossorigin="anonymous"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/stardisblue/presenter@latest/dist/index.min.css"
/>

<script src="https://cdn.jsdelivr.net/gh/stardisblue/presenter@latest/dist/index.min.js"></script>
<script>
  presenter.create(document.querySelector("#container"), [
    {
      title: "Hello World",
      content: md`
this is _presenter_
      `,
    },
  ]);
</script>
```

## ES6

```js
import { create, md } from "presenter";

const presentation = create(document.querySelector("#container"), [
  {
    title: "Hello World",
    content: md`
this is _presenter_
    `,
  },
]);
```

## API Documentation

**Presentation**(_options_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/presentation.ts#L98)

Creates the presentation container and is used to load pages. It tracks the number of preloaded slides and will remove them when a given treshold is reached.

_options_:

- `lazy` (default: 2) number of cached pages
- `Template` (default: `SimplePage`) function used to create a page (see `Page` below).

_presentation_.**load**(_page[, data]_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/presentation.ts#L112)

Loads the given page and passes the data to it. It will put this page as the first element of the presentation container.

_presentation_.**preload**(_page[, data]_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/presentation.ts#L142)

Load the given page and passes data to it, It will append this page to the presentation container.

**navigation**(_options_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L18)

Creates a navigation element to help navigating through the slides.

_options_:

- `max` (default: 0) the total number of pages
- `previousKeys` (default: ↑, ←, h, k, w, a) the keyboard letters to previous page
- `nextKeys` (default: ↓, →, j, l, s, d) the keywboard letter to next page
- `stopPropagation` (default: `false`) stops the event propagation.

_navigation_.**current** current page number

_navigation_.**max** total number of pages

_navigation_.**previousPage**([_event_]) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L49)

Sets navigation to previous page. If _event_ is passed, it will stop the event propagation depending on the `stopPropagation` option

_navigation_.**nextPage**([_event_]) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L59)

Sets navigation to next page .If _event_ is passed, it will stop the event propagation depending on the `stopPropagation` option

_navigation_.**collect**([_offset_]) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L69)

Will return an array containing the `offset` next page numbers, in respect to 0 and `max` bounds. If offset is omitted, it defaults to 1.

_navigation_.**page**(_goto_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L73)

Sets the navigation to the given page (in respect to 0 and `max`). If `goto` is the page number, it will be ignored.

_navigation_.**bind**(_el_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L81)

Bind the navigation (`previousPage`, `nextPage`) to `el`. The navigation events include `pointerup` (right and left clicks), `keydown` (`previousKeys` and `nextKeys`). It will also automatically suppress contextmenu and will focus `el` on call and on `mouseenter`.

_navigation_.**on**(_type, listener_) · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L91)

Will trigger _listener_ on the given _type_ event.

- `previous`: triggered when `previousPage` is called
- `next` : triggered when `nextPage` is called
- `page`: triggered when the page changes (`page`, `previousPage`, `nextPage`, `first`)

_navigation_.**first**() · [`<>`](https://github.com/stardisblue/presenter/blob/main/src/navigation.ts#L95)

Helper that goes on the first pages. Used to initialize the navigation.

_navigation_.**events** exposes `onClick` and `onKeyDown` function for advanced usecases.

**Page**

in construction
