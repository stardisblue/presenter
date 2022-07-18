 
import { select } from 'd3-selection';
import keyBy from "lodash.keyby"
import range from 'lodash.range';
import { focus, preventDefault } from './event-utils';

type NavigationOptions = {
  max?: number;
  previousKeys?: string[];
  nextKeys?: string[];
  stopPropagation?: boolean;
};

type NavigationCallback = (
  page: number,
  previous: number,
  nav: ReturnType<typeof navigation>
) => void;

export function navigation({
  max = 0,
  previousKeys = ['ArrowUp', 'ArrowLeft', 'KeyH', 'KeyK', 'KeyW', 'KeyA'],
  nextKeys = [
    'ArrowDown',
    'ArrowRight',
    'KeyJ',
    'KeyL',
    'KeyS',
    'KeyD',
    // 'Space',
  ],
  stopPropagation = false,
}: NavigationOptions = {}) {
  const keys = {
    previous: keyBy(previousKeys),
    next: keyBy(nextKeys),
  };
  const listeners: {
    previous: NavigationCallback | undefined;
    next: NavigationCallback | undefined;
    page: NavigationCallback | undefined;
  } = {
    previous: undefined,
    next: undefined,
    page: undefined,
  };

  const nav = {
    current: 0,
    max,
    previousPage(event?: UIEvent) {
      const last = nav.current;
      if (last > 0) {
        if (stopPropagation && event) event.stopPropagation();
        nav.current--;
        if (listeners.previous) listeners.previous(nav.current, last, nav);
        if (listeners.page) listeners.page(nav.current, last, nav);
      }
      return nav;
    },
    nextPage(event?: UIEvent) {
      const last = nav.current;
      if (last < max - 1) {
        if (stopPropagation && event) event.stopPropagation();
        nav.current++;
        if (listeners.next) listeners.next(nav.current, last, nav);
        if (listeners.page) listeners.page(nav.current, last, nav);
      }
      return nav;
    },
    collect(offset: number = 1) {
      const bounded = Math.max(Math.min(offset + nav.current, max - 1), 0);
      return range(nav.current + 1, bounded + 1, Math.sign(offset));
    },
    page(goto: number) {
      if (goto !== nav.current) {
        const last = nav.current;
        nav.current = Math.max(Math.min(goto, max - 1), 0);
        if (listeners.page) listeners.page(nav.current, last, nav);
      }
      return nav;
    },
    bind: ($div: HTMLElement) => {
      select($div)
        .on('pointerup', nav.events.onClick)
        .on('keydown', nav.events.onKeyDown)
        .on('contextmenu', preventDefault) // avoid opening context menu on right click
        .on('mouseenter', focus);
      // .on('mouseleave', blur);
      $div.focus();
      return nav;
    },
    on(type: 'previous' | 'next' | 'page', listener?: NavigationCallback) {
      listeners[type] = listener;
      return nav;
    },
    first() {
      if (listeners.page) listeners.page(0, 0, nav);
    },
    events: {
      onClick(event: MouseEvent) {
        if (event.button === 2) nav.previousPage(event);
        else if (event.button === 0) nav.nextPage(event);
      },
      onKeyDown(event: KeyboardEvent) {
        if (event.code in keys.previous) nav.previousPage(event);
        else if (event.code in keys.next) nav.nextPage(event);
      },
    },
  };
  return nav;
}
