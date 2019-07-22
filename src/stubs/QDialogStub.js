export const QDialogStub = {
  name: 'QDialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  render: function(h) {
    return h('div', {
      style: {
        display: (this.value ? 'block' : 'none'),
      },
    }, this.$slots.default)
  },
}
