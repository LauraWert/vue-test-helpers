import { CreateElement, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'QDialog',
})
export class QDialogStub extends Vue {
  @Prop({ required: true, type: Boolean }) public value!: boolean

  // tslint:disable-next-line:variable-name
  public __hasPortal: boolean = true

  get open(): boolean {
    return this.value
  }

  set open(v: boolean) {
    this.$emit('input', v)
  }

  public render(h: CreateElement): VNode {
    return h('div', {
      style: {
        display: (this.open ? 'block' : 'none'),
      },
    }, this.$slots.default)
  }

  public beforeMount(): void {
    // needs to be set for v-close-popup directive from quasar 1.1.x
    this.__hasPortal = true
  }

  public hide(): void {
    this.open = false
  }
}
