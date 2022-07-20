import Katex from 'katex';

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
    bind: (el: HTMLElement) => any;
    on(type: 'previous' | 'next' | 'page', listener?: NavigationCallback): any;
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
    template?: 'title' | 'full';
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
declare const defaultFooter: ({ page, nav }: PageData) => HTMLFormElement;
declare type PageState<D> = PageObject | ((data?: D) => PageObject);
declare function Presentation({ lazy, Template, }?: {
    lazy?: number;
    Template?: (props: PageObject, data?: any) => PageElement;
}): HTMLElement & {
    load<T>(newState: PageState<T>, data?: T | undefined): void;
    preload<T_1>(newState: PageState<T_1>, data?: T_1 | undefined): void;
};
declare function resolve<T>(res: any, ...rest: [T, ...any]): null | string | Node;

declare function create(container: HTMLElement, pages: PageState<PageData>[]): {
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
        on(type: "previous" | "next" | "page", listener?: NavigationCallback | undefined): any;
        first(): void;
        events: {
            onClick(event: MouseEvent): void;
            onKeyDown(event: KeyboardEvent): void;
        };
    };
};

interface HTMLType {
    <T extends HTMLElement = HTMLElement>(strings: TemplateStringsArray, ...args: any[]): T;
    fragment<T extends HTMLElement = HTMLElement>(arr: TemplateStringsArray, ...args: any[]): T;
}
declare const stub$1: HTMLType;
//# sourceMappingURL=html.d.ts.map

interface SVGType {
    <T extends SVGElement = SVGElement>(arr: TemplateStringsArray, ...args: any[]): T;
}
declare const stub: SVGType;
//# sourceMappingURL=svg.d.ts.map

declare const md: (strings: TemplateStringsArray, ..._args: any[]) => Element;
declare const mdi: (strings: TemplateStringsArray, ..._args: any[]) => Element;

declare function createTex(katex: typeof Katex): ((strings: TemplateStringsArray, ...args: any[]) => Element) & {
    block: (strings: TemplateStringsArray, ...args: any[]) => Element;
};
declare const tex: ((strings: TemplateStringsArray, ...args: any[]) => Element) & {
    block: (strings: TemplateStringsArray, ...args: any[]) => Element;
};

export { NavigationCallback, NavigationOptions, PageData, PageObject, PageState, Presentation, create, createTex, defaultFooter, stub$1 as html, md, mdi, navigation, resolve, stub as svg, tex };
