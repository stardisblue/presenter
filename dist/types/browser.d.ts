import "./styles.css";
import { navigation } from "./navigation";
import { PageData, PageState, Presentation } from "./presentation";
export { html, svg } from "htl";
export { defaultFooter } from "./presentation";
export { navigation, Presentation };
export { md, mdi } from "./md";
export { tex } from "./tex";
export declare function create(container: HTMLElement, pages: PageState<PageData>[]): {
    pres: HTMLElement & {
        load<T>(newState: PageState<T>, data?: T | undefined): void;
        preload<T_1>(newState: PageState<T_1>, data?: T_1 | undefined): void;
    };
    nav: {
        current: number;
        max: number;
        previousPage(event?: UIEvent | undefined): any;
        nextPage(event?: UIEvent | undefined): any;
        collect(offset?: number): number[];
        page(goto: number): any;
        bind: (el: HTMLElement) => any;
        on(type: "previous" | "next" | "page", listener?: ((page: number, previous: number, nav: any) => void) | undefined): any;
        first(): void;
        events: {
            onClick(event: MouseEvent): void;
            onKeyDown(event: KeyboardEvent): void;
        };
    };
};
//# sourceMappingURL=browser.d.ts.map