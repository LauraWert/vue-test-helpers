import { Wrapper } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'
import ExpectStatic = Chai.ExpectStatic

export interface IEWrapper<V extends Vue> extends Wrapper<V> {
  getInput(name: string): Wrapper<Vue>

  getTextFromInput(name: string): string

  getIntFromInput(name: string): number

  setInputValue(arg0: string, arg1: string): void

  getQChipLength(name: string): number

  getOptionsValue(name: string): string

  getMultiOptionsValue(name: string): string[]

  validateInputs(validatorCallbackName: string, expect: ExpectStatic, obj: { [_: string]: string }): void

  validateForm(expect: ExpectStatic, obj: { [_: string]: { [_: string]: string } }): void

  submitForm(name: string): Promise<null>

  // tslint:disable-next-line:no-any
  setSelectValue(name: string, value: any): void
}

export interface IPluginOptions {
  app?: object
  router?: object
  store?: object
}

export interface ICreateTestAppOptions extends IPluginOptions {
  // tslint:disable-next-line:no-any
  plugins?: any
}
