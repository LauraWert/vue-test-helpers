<template>
  <div>
    <q-checkbox v-model="checked" data-name="my-checkbox" />
    <q-input v-model="value" name="my-input" />
    <div data-name="my-data-name-element">
      data-name content
    </div>
  </div>
</template>

<script lang="ts">
import { QCheckbox } from 'quasar/src/components/checkbox'
import { QInput } from 'quasar/src/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { QCheckbox, QInput },
})
export default class EWrapperHelper extends Vue {
  public value: string = ''
  public checked: boolean = false
}
</script>
