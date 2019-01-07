import { createLocalVue } from '@vue/test-utils'
import quasar from 'quasar'
import Vue, { VueConstructor } from 'vue'
import ExtendedTransitionStub from './stubs/ExtendedTransitionStub'

interface IPluginOptions {
  app?: object
  router?: object
  store?: object
}

interface ICreateTestAppOptions extends IPluginOptions {
  // tslint:disable-next-line:no-any
  plugins?: any
}

export function createTestApp(options: ICreateTestAppOptions = {}): VueConstructor<Vue> {
  const app = options.app || null
  const router = options.router || null
  const store = options.store || null

  Vue.use(quasar)
  const localVue = createLocalVue()

  const plugins = options.plugins || []
  // tslint:disable-next-line:no-any
  plugins.forEach((plugin: any) => plugin({app, router, store, Vue: localVue}))

  // needs to be changed to config.stubs.transition if test-utils gets updated
  localVue.component('transition', ExtendedTransitionStub)

  return localVue
}
