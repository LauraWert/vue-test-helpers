import { mount, MountOptions, shallowMount, Wrapper } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import { Vue } from 'vue/types/vue'
import { IEWrapper } from './types'
import ChaiExpect = Chai.ExpectStatic

export function eMount<V extends Vue>(component: VueConstructor<V>, options?: MountOptions<V>): IEWrapper<V> {
  return extendWrapper(<IEWrapper<V>> mount(component, options))
}

export function eShallow<V extends Vue>(component: VueConstructor<V>, options?: MountOptions<V>): IEWrapper<V> {
  return extendWrapper(<IEWrapper<V>> shallowMount(component, options))
}

export function extendWrapper<V extends Vue>(wrapper: IEWrapper<V>): IEWrapper<V> {
  wrapper.getInput = (name: string): Wrapper<Vue> => {
    return wrapper.find(`input[name="${name}"], input[data-name="${name}"]`)
  }

  wrapper.getTextFromInput = (name: string): string => {
    const input = <HTMLInputElement> wrapper.getInput(name).element
    return input.value
  }

  wrapper.getIntFromInput = (name: string): number => {
    const input = <HTMLInputElement> wrapper.getInput(name).element
    return parseInt(input.value, 10)
  }

  wrapper.setInputValue = (name: string, value): void => {
    const input = wrapper.getInput(name)
    // @ts-ignore
    input.element.value = value
    input.trigger('input')
  }

  wrapper.getQChipLength = (name: string): number => {
    return wrapper.findAll('div[name="' + name + '"] .q-chip-main').length
  }

  wrapper.getOptionsValue = (name: string): string => {
    return wrapper.find('div[name="' + name + '"] div.q-input-target').element.innerHTML.trim()
  }

  wrapper.getMultiOptionsValue = (name: string): string[] => {
    return wrapper.find('div[name="' + name + '"] div.q-input-target').element.innerHTML
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '')
  }

  wrapper.validateInputs = (validatorCallbackName: string, expect: ChaiExpect, obj: { [_: string]: string }): void => {
    for (const i of Object.keys(obj)) {
      // @ts-ignore
      expect(this[validatorCallbackName](i)).to.eql(obj[i])
    }
  }

  wrapper.validateForm = (expect: ChaiExpect, formValues: { [_: string]: { [_: string]: string } }): void => {
    const keyAndGetter: { [_: string]: string } = {
      qChipLengths: 'getQChipLength',
      options: 'getOptionsValue',
      multiOptions: 'getMultiOptionsValue',
      ints: 'getIntFromInput',
      texts: 'getTextFromInput',
    }
    for (const key of Object.keys(keyAndGetter)) {
      if (key in formValues) {
        wrapper.validateInputs(keyAndGetter[key], expect, formValues[key])
      }
    }
  }

  wrapper.submitForm = async (name: string): Promise<void> => {
    // $nextTick because vee-validate can't read the password value otherwise
    // (it uses the initial value)
    await wrapper.vm.$nextTick()
    wrapper.find('[data-name="' + name + '"]').trigger('submit')

    // We do a flushPromisesTimeout so the validator is ready after submission
    return flushPromisesTimeout()
  }

  // tslint:disable-next-line:no-any
  wrapper.setSelectValue = (name: string, value: any): void => {
    wrapper.find('[name="' + name + '"').vm.$emit('input', value)
  }

  return wrapper
}

// flush promise with timeout because the setImmediate never resolves
function flushPromisesTimeout(): Promise<void> {
  return new Promise((resolve: () => void): void => {
    setTimeout(resolve)
  })
}
