import Katex from 'katex';
export declare function createTex(katex: typeof Katex): ((strings: TemplateStringsArray, ...args: any[]) => Element) & {
    block: (strings: TemplateStringsArray, ...args: any[]) => Element;
};
export declare const tex: ((strings: TemplateStringsArray, ...args: any[]) => Element) & {
    block: (strings: TemplateStringsArray, ...args: any[]) => Element;
};
//# sourceMappingURL=tex.d.ts.map