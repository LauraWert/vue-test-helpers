import IVue, { ComponentOptions } from 'vue'

export function addAppToWindow<V extends IVue>(app: ComponentOptions<V>): void {
  if (window.Cypress) {
    // @ts-ignore
    window.app = app
  }
}
