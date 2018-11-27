import { createLocalVue } from '@vue/test-utils'
import quasar from 'quasar'
import Vue from 'vue'
import ExtendedTransitionStub from './stubs/ExtendedTransitionStub'

export function createTestApp(options = {}) {
  const app = options.app || null
  const router = options.router || null
  const store = options.store || null

  Vue.use(quasar)
  const localVue = createLocalVue()

  const plugins = options.plugins || []
  plugins.forEach(plugin => plugin({app, router, store, Vue: localVue}))

  // needs to be changed to config.stubs.transition if test-utils gets updated
  localVue.component('transition', ExtendedTransitionStub)

  return localVue
}
