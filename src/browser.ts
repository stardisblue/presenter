import "./styles.css";

import { navigation } from "./navigation";
import { PageData, PageState, Presentation } from "./presentation";

export { html, svg } from "htl";

export { defaultFooter } from "./presentation";

export { navigation, Presentation };

export { md, mdi } from "./md";
export { tex } from "./tex";

export function create(container: HTMLElement, pages: PageState<PageData>[]) {
  const pres = Presentation({ lazy: 2 });
  container.append(pres);

  const nav = navigation({ max: pages.length })
    .on("page", function (page, _prev, nav) {
      pres.load(pages[page], { page: page + 1, nav });
      nav
        .collect(2)
        .forEach((v, i) => pres.preload(pages[v], { page: page + 1, nav }));
    })
    .bind(pres);
  nav.first();

  return { pres, nav };
}
