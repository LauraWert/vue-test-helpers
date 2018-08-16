import { TransitionStub } from '@vue/test-utils'

export default {
  name: 'ExtendedTransitionStub',
  extends: TransitionStub,
  options () {
    /**
     * Added becaue @vue/test-utils checks if stub is a string or component.
     * according to them a component has a render, options or template attribute
     * the render of transition stub gets placed in extends: {render: ...}
     */
    return {}
  },
  methods: {
    triggerEnterHooks () {
      this.$emit('beforeEnter')
      this.$emit('enter')
      this.$emit('afterEnter')
    },
    triggerLeaveHooks () {
      this.$emit('beforeLeave')
      this.$emit('leave')
      this.$emit('afterLeave')
    },
  },
}
