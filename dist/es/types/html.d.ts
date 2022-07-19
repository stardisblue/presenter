interface HTMLType {
    <T extends HTMLElement = HTMLElement>(strings: TemplateStringsArray, ...args: any[]): T;
    fragment<T extends HTMLElement = HTMLElement>(arr: TemplateStringsArray, ...args: any[]): T;
}
declare const stub: HTMLType;
export { stub as html };
//# sourceMappingURL=html.d.ts.map