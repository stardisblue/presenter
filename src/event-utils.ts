export function focus(this: HTMLElement) {
  this.focus();
}

export function blur(this: HTMLElement) {
  this.blur();
}

/**Prevent default wrapper
 * @param {UIEvent} e
 */
export function preventDefault(e: UIEvent) {
  // avoid opening context menu on right click
  e.preventDefault();
}
