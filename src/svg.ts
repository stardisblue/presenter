import { svg } from 'htl';

interface SVGType {
  <T extends SVGElement = SVGElement>(
    arr: TemplateStringsArray,
    ...args: any[]
  ): T;
}

const stub: SVGType = svg;
export { stub as svg };
