import { html } from 'htl';

interface HTMLType {
  <T extends HTMLElement = HTMLElement>(
    strings: TemplateStringsArray,
    ...args: any[]
  ): T;
  fragment<T extends HTMLElement = HTMLElement>(
    arr: TemplateStringsArray,
    ...args: any[]
  ): T;
}

const stub: HTMLType = html;

export { stub as html };
