declare module "htl" {
  interface html {
    fragment<T extends HTMLElement = HTMLElement>(
      arr: TemplateStringsArray,
      ...args: any[]
    ): T;
  }

  function html<T extends HTMLElement = HTMLElement>(
    strings: TemplateStringsArray,
    ...args: any[]
  ): T;

  // module html {
  //   function fragment<T extends HTMLElement = HTMLElement>(
  //     arr: TemplateStringsArray,
  //     ...args: any[]
  //   ): T;
  // }

  function svg<T extends SVGElement = SVGElement>(
    arr: TemplateStringsArray,
    ...args: any[]
  ): T;
}
