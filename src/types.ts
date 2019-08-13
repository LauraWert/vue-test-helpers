import { VueTestUtilsConfigOptions } from '@vue/test-utils'
import { VueConstructor } from 'vue/types/vue'

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
