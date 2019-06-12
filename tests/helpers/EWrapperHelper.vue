<template>
  <div>
    <q-checkbox v-model="checked" data-name="my-checkbox" />
    <q-input v-model="value" name="my-input" />
    <q-select v-model="selectValue" name="my-select" />
    <div data-name="my-data-name-element">
      data-name content
    </div>
  </div>
</template>

<script lang="ts">
import { QCheckbox } from 'quasar/src/components/checkbox'
import { QInput } from 'quasar/src/components/input'
import { QSelect } from 'quasar/src/components/select'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { QCheckbox, QInput, QSelect },
})
export default class EWrapperHelper extends Vue {
  public value: string = ''
  public selectValue: string = ''
  public checked: boolean = false
}
</script>
