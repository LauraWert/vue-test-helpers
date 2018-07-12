import { createLocalVue, TransitionStub } from '@vue/test-utils'
import { fullNameFilter, dateFilter } from '@laura-wert/vue-helpers'
import quasar from 'quasar'

export function createTestApp (options = {}) {
  const app = options.app || null
  const router = options.router || null
  const store = options.store || null

  const localVue = createLocalVue()
  localVue.use(quasar)

  const plugins = options.plugins || []
  plugins.push(fullNameFilter)
  plugins.push(dateFilter)

  localVue.component('transition', TransitionStub)

  plugins.forEach(plugin => plugin({app, router, store, Vue: localVue}))
  return localVue
}
