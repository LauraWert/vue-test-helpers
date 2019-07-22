export const QDialogStub = {
  name: 'QDialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  render: function(h) {
    if (!this.value) return null

    return h('div', this.$slots.default)
  },
}
