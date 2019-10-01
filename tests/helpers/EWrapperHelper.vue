<template>
  <validation-observer ref="validationObserver">
    <q-checkbox v-model="checked" data-name="my-checkbox" />
    <uw-input v-model="value" rules="required" name="my-input" />
    <q-select v-model="selectValue" :options="options" name="my-select" />
    <q-select
      v-model="multiSelectValue"
      :options="options"
      multiple
      name="my-multi-select"
    />
    <q-select
      v-model="chipsValue"
      :options="options"
      use-chips
      multiple
      name="my-chips-select"
    />
    <div data-name="my-data-name-element">
      data-name content
    </div>
  </validation-observer>
</template>

<script lang="ts">
import { UwInput } from '@laura-wert/vee-form-handler'
import { QCheckbox } from 'quasar/src/components/checkbox'
import { QSelect } from 'quasar/src/components/select'
import { ValidationObserver } from 'vee-validate'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { QCheckbox, UwInput, QSelect, ValidationObserver },
})
export default class EWrapperHelper extends Vue {
  public value: string = 'init'
  public selectValue: string = ''
  public multiSelectValue: string[] = []
  public chipsValue: string[] = []
  public checked: boolean = false
  public options: string[] = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
  ]
}
</script>
