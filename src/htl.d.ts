declare module 'htl' {
  interface HtmlI {
    <T extends HTMLElement = HTMLElement>(
      strings: TemplateStringsArray,
      ...args: any[]
    ): T;
    fragment<T extends HTMLElement = HTMLElement>(
      arr: TemplateStringsArray,
      ...args: any[]
    ): T;
  }

  var html: HtmlI;

  function svg<T extends SVGElement = SVGElement>(
    arr: TemplateStringsArray,
    ...args: any[]
  ): T;
}
