import { config, createLocalVue } from '@vue/test-utils'
import langNl from 'quasar/lang/nl'
import Quasar from 'quasar/src/vue-plugin.js'
import Vue, { VueConstructor } from 'vue'
import ExtendedTransitionStub from './stubs/ExtendedTransitionStub.js'
import { ICreateTestAppOptions, IQuasarConfig } from './types'

export function createTestApp(options: ICreateTestAppOptions = {}): VueConstructor<Vue> {
  const router = options.router || null
  const store = options.store || null
  const quasarConfig = options.quasarConfig || {
    config: {},
  } as IQuasarConfig

  if (typeof quasarConfig.lang === 'undefined') {
    quasarConfig.lang = langNl
  }

  Vue.use(Quasar, quasarConfig)
  const localVue = createLocalVue()

  const plugins = options.plugins || []
  // tslint:disable-next-line:no-any
  plugins.forEach((plugin: any) => plugin({ app: localVue, router, store, Vue }))

  // needs to be changed to config.stubs.transition if test-utils gets updated
  // Vue.component('transition', ExtendedTransitionStub)
  // @ts-ignore
  config.stubs.transition = ExtendedTransitionStub

  return localVue
}
