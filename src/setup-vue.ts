import VueTestUtils from '@vue/test-utils'
import langNl from 'quasar/lang/nl'
import Quasar from 'quasar/src/vue-plugin.js'
import Vue, { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { IAddQuasarOptions, IQuasarConfig, ISetupOptions } from './types'

function addOptionDefaults(options: ISetupOptions): void {
  options.Vue = options.Vue || Vue
  options.testUtilsConfig = options.testUtilsConfig || VueTestUtils.config
}

export function addQuasarToVue(options: IAddQuasarOptions = {}): void {
  addOptionDefaults(options)
  const quasarConfig = options.quasarConfig || {
    config: {},
  } as IQuasarConfig

  if (typeof quasarConfig.lang === 'undefined') {
    quasarConfig.lang = langNl
  }

  options.Vue!.use(Quasar, quasarConfig)
}

export function mockVueI18n(options: ISetupOptions = {}): void {
  addOptionDefaults(options)
  options.testUtilsConfig!.mocks!.$t = (key: string, params: unknown): string =>
    key + (params ? '_' + JSON.stringify(params) : '')
  options.testUtilsConfig!.mocks!.$tc = (key: string, params: unknown): string =>
    key + (params ? '_' + JSON.stringify(params) : '')
  options.testUtilsConfig!.mocks!.$n = (key: string, params: unknown): string =>
    key + (params ? '_' + JSON.stringify(params) : '')

  options.Vue!.directive('t', {
    bind: (el: HTMLElement, binding: DirectiveBinding, vnode: VNode): void => {
      el.textContent = JSON.stringify(binding.value)
    },
  })
}
