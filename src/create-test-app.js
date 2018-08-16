import { createLocalVue } from '@vue/test-utils'
import ExtendedTransitionStub from './stubs/ExtendedTransitionStub'
import quasar from 'quasar'

export function createTestApp (options = {}) {
  const app = options.app || null
  const router = options.router || null
  const store = options.store || null

  const localVue = createLocalVue()
  localVue.use(quasar)

  const plugins = options.plugins || []

  localVue.component('transition', ExtendedTransitionStub) // needs to be changed to config.stubs.transition if test-utils gets updated

  plugins.forEach(plugin => plugin({app, router, store, Vue: localVue}))
  return localVue
}
