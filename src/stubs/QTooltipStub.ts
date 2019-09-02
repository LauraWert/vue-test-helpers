import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'QTootltip',
})
export class QTooltipStub extends Vue {
  public render(h: CreateElement): VNode {
    return h('div', {
      class: 'q-tooltip-stub',
      style: {
        display: 'none',
      },
    }, this.$slots.default)
  }
}
