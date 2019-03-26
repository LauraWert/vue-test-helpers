import { VueTestUtilsConfigOptions, Wrapper } from '@vue/test-utils'
import { Vue, VueConstructor } from 'vue/types/vue'
import ExpectStatic = Chai.ExpectStatic

export interface IEWrapper<V extends Vue> extends Wrapper<V> {
  getInput(name: string): Wrapper<Vue>

  getTextFromInput(name: string): string

  getIntFromInput(name: string): number

  getValidationError(name: string): string

  setInputValue(name: string, value: string): void

  getQChipLength(name: string): number

  getOptionsValue(name: string): string

  getMultiOptionsValue(name: string): string[]

  toggleCheckbox(name: string): Wrapper<Vue>

  validateInputs(validatorCallbackName: string, expect: ExpectStatic, obj: { [_: string]: string }): void

  validateForm(expect: ExpectStatic, obj: { [_: string]: { [_: string]: string } }): void

  submitForm(name: string): Promise<void>

  // tslint:disable-next-line:no-any
  setSelectValue(name: string, value: any): void

  getByName(name: string): Wrapper<Vue>
}

export interface ISetupOptions {
  Vue?: VueConstructor
  testUtilsConfig?: VueTestUtilsConfigOptions
}

export interface IQuasarConfig {
  config?: object,
  // tslint:disable-next-line:no-any
  lang?: any,
  // tslint:disable-next-line:no-any
  iconSet?: any,
  directives?: object,
  plugins?: object
}

export interface IAddQuasarOptions extends ISetupOptions {
  quasarConfig?: IQuasarConfig
}
