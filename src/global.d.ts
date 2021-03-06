import Vue, { ComponentOptions } from 'vue'

declare global {
  /* tslint:disable interface-name */
  interface Window {
    app: ComponentOptions<Vue>
    Cypress: object
  }

  interface HTMLElement {
    __vue__: Vue
  }
}
