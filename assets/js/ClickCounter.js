export const name = 'click-counter';

// Setup called once on creation
export function setup({ start }) {
  // variable attached to this
  this.count = parseInt(start);
}

// Render return value to page
export function render() {
  return `COUNT: ${this.count}`;
}

// Run after each render
export function run() {

  // Asynchronous, will re-render
  this._elem.onclick = () =>
    setTimeout(() => this.count++, 50)
}
