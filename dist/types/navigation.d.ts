declare type NavigationOptions = {
    max?: number;
    previousKeys?: string[];
    nextKeys?: string[];
    stopPropagation?: boolean;
};
declare type NavigationCallback = (page: number, previous: number, nav: ReturnType<typeof navigation>) => void;
export declare function navigation({ max, previousKeys, nextKeys, stopPropagation, }?: NavigationOptions): {
    current: number;
    max: number;
    previousPage(event?: UIEvent): any;
    nextPage(event?: UIEvent): any;
    collect(offset?: number): number[];
    page(goto: number): any;
    bind: (el: HTMLElement) => any;
    on(type: "previous" | "next" | "page", listener?: NavigationCallback): any;
    first(): void;
    events: {
        onClick(event: MouseEvent): void;
        onKeyDown(event: KeyboardEvent): void;
    };
};
export {};
//# sourceMappingURL=navigation.d.ts.map