import type { PageData, PageState } from './presentation';
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
        on(type: "previous" | "next" | "page", listener?: import("./navigation").NavigationCallback | undefined): any;
        first(): void;
        events: {
            onClick(event: MouseEvent): void;
            onKeyDown(event: KeyboardEvent): void;
        };
    };
};
//# sourceMappingURL=create.d.ts.map