export { html, svg } from 'htl';

declare type NavigationOptions = {
    max?: number;
    previousKeys?: string[];
    nextKeys?: string[];
    stopPropagation?: boolean;
};
declare type NavigationCallback = (page: number, previous: number, nav: ReturnType<typeof navigation>) => void;
declare function navigation({ max, previousKeys, nextKeys, stopPropagation, }?: NavigationOptions): {
    current: number;
    max: number;
    previousPage(event?: UIEvent): any;
    nextPage(event?: UIEvent): any;
    collect(offset?: number): number[];
    page(goto: number): any;
    bind: ($div: HTMLElement) => any;
    on(type: "previous" | "next" | "page", listener?: NavigationCallback): any;
    first(): void;
    events: {
        onClick(event: MouseEvent): void;
        onKeyDown(event: KeyboardEvent): void;
    };
};

declare type PageData = {
    page: number;
    nav: ReturnType<typeof navigation>;
};
declare type PageProp = string | Element | ((data: PageData, $holder: HTMLDivElement) => string | Element | void) | undefined;
declare type PageObject = {
    template?: "title" | "full";
    content?: PageProp;
    footer?: PageProp;
    background?: PageProp;
    [key: string]: PageProp;
};
declare type PageElement = HTMLElement & {
    $title: HTMLElement;
    $content: HTMLElement;
    $footer: HTMLElement;
    render: () => void;
};
declare type PageState<D> = PageObject | ((data: D) => PageObject);
declare function Pages({ lazy, Template, }?: {
    lazy?: number;
    Template?: (props: PageObject, data: any) => PageElement;
}): HTMLElement & {
    load<T>(newState: PageState<T>, data: T): void;
    preload<T_1>(step: number, newState: PageState<T_1>, data: T_1): boolean;
};

declare const md: (strings: TemplateStringsArray, ..._args: any[]) => Element;
declare const mdi: (strings: TemplateStringsArray, ..._args: any[]) => Element;

declare const tex: ((strings: TemplateStringsArray, ...args: any[]) => Element) & {
    block: (strings: TemplateStringsArray, ...args: any[]) => Element;
};

export { Pages, md, mdi, navigation, tex };
