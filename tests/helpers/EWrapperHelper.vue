<template>
  <div>
    <q-input v-model="value" name="my-input" />
    <div data-name="my-data-name-element">
      data-name content
    </div>
  </div>
</template>

<script lang="ts">
import { QInput } from 'quasar/src/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { QInput },
})
export default class EWrapperHelper extends Vue {
  public value: string = ''
}
</script>
