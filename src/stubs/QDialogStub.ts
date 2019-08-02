import { CreateElement, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'QDialog',
})
export class QDialogStub extends Vue {
  @Prop({ required: true, type: Boolean }) public value!: boolean

  public render(h: CreateElement): VNode {
    return h('div', {
      style: {
        display: (this.value ? 'block' : 'none'),
      },
    }, this.$slots.default)
  }
}
