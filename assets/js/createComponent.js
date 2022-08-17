export default function CreateComponent(Component) {
  class ReactiveElement extends HTMLElement {
    connectedCallback() {
      // Get element's props
      const props = {}
      Array.from(this.attributes).forEach(
        attr => (props[attr.nodeName] = attr.nodeValue)
      )

      // Attach helper methods to state
      let state = Object.create({
        _elem: this,
        _find: sel => this.querySelector(sel),
        _slot: this.innerHTML
      })

      // Add proxy to state and watch for changes
      state = new Proxy(state, {
        set: (obj, prop, value) => {
          const result = Reflect.set(obj, prop, value)
          renderElement()
          return result
        }
      })

      // Render to body method
      let rendering = false
      const renderElement = () => {
        if (rendering === false) {
          rendering = true
          this.innerHTML = Component.render.call(state, props)
          Component.run.call(state, props)
          rendering = false
        }
      }

      // Run component
      Component.setup.call(state, props)
      renderElement()
    }
  }

  // Define custom element
  customElements.define(Component.name, ReactiveElement)
}