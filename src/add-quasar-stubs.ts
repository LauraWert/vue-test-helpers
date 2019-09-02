import { QDialogStub } from 'src/stubs/QDialogStub'
import { QTooltipStub } from 'src/stubs/QTooltipStub'
import { VueConstructor } from 'vue'

export function addQuasarStubs(Vue: VueConstructor): void {
  Vue.component('q-tooltip', QTooltipStub)
  Vue.component('q-dialog', QDialogStub)
}
