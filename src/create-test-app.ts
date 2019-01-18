import { createLocalVue } from '@vue/test-utils'
import Quasar from 'quasar'
import lang from 'quasar-framework/i18n/nl'
import Vue, { VueConstructor } from 'vue'
import ExtendedTransitionStub from './stubs/ExtendedTransitionStub.js'
import { ICreateTestAppOptions, IQuasarConfig } from './types'

export function createTestApp(options: ICreateTestAppOptions = {}): VueConstructor<Vue> {
  const router = options.router || null
  const store = options.store || null
  const quasarConfig = options.quasarConfig || <IQuasarConfig> {
    config: {},
  }

  if (typeof quasarConfig.i18n === 'undefined') {
    quasarConfig.i18n = lang
  }

  Vue.use(Quasar, quasarConfig)
  const localVue = createLocalVue()

  const plugins = options.plugins || []
  // tslint:disable-next-line:no-any
  plugins.forEach((plugin: any) => plugin({ app: localVue, router, store, Vue }))

  // needs to be changed to config.stubs.transition if test-utils gets updated
  localVue.component('transition', ExtendedTransitionStub)

  return localVue
}
