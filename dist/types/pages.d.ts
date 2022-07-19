import { navigation } from "./navigation";
export declare type PageData = {
    page: number;
    nav: ReturnType<typeof navigation>;
};
declare type PageProp = string | Element | ((data: PageData, $holder: HTMLDivElement) => string | Element | void) | undefined;
export declare type PageObject = {
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
export declare const defaultFooter: ({ page, nav }: PageData) => HTMLFormElement;
declare type PageState<D> = PageObject | ((data: D) => PageObject);
export declare function Pages({ lazy, Template, }?: {
    lazy?: number;
    Template?: (props: PageObject, data: any) => PageElement;
}): HTMLElement & {
    load<T>(newState: PageState<T>, data: T): void;
    preload<T_1>(step: number, newState: PageState<T_1>, data: T_1): boolean;
};
export {};
//# sourceMappingURL=pages.d.ts.map