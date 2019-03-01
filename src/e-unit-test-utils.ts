import { mount, MountOptions, shallowMount, Wrapper } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import { Vue } from 'vue/types/vue'
import { IEWrapper } from './types'
import ChaiExpect = Chai.ExpectStatic

export function eMount<V extends Vue>(component: VueConstructor<V>, options?: MountOptions<V>): IEWrapper<V> {
  return extendWrapper(mount(component, options) as IEWrapper<V>)
}

export function eShallow<V extends Vue>(component: VueConstructor<V>, options?: MountOptions<V>): IEWrapper<V> {
  return extendWrapper(shallowMount(component, options) as IEWrapper<V>)
}

export function extendWrapper<V extends Vue>(wrapper: Wrapper<V>): IEWrapper<V> {
  const eWrapper = wrapper as IEWrapper<V>
  eWrapper.getInput = (name: string): Wrapper<Vue> => {
    return eWrapper.find(`input[name="${name}"], input[data-name="${name}"]`)
  }

  eWrapper.getTextFromInput = (name: string): string => {
    const input = eWrapper.getInput(name).element as HTMLInputElement
    return input.value
  }

  eWrapper.getIntFromInput = (name: string): number => {
    const input = eWrapper.getInput(name).element as HTMLInputElement
    return parseInt(input.value, 10)
  }

  eWrapper.setInputValue = (name: string, value): void => {
    const input = eWrapper.getInput(name)
    // @ts-ignore
    input.element.value = value
    input.trigger('input')
  }

  eWrapper.getQChipLength = (name: string): number => {
    return eWrapper.findAll('div[name="' + name + '"] .q-chip-main').length
  }

  eWrapper.getOptionsValue = (name: string): string => {
    return eWrapper.find('div[name="' + name + '"] div.q-input-target').element.innerHTML.trim()
  }

  eWrapper.getMultiOptionsValue = (name: string): string[] => {
    return eWrapper.find('div[name="' + name + '"] div.q-input-target').element.innerHTML
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '')
  }

  eWrapper.toggleCheckbox = (name: string = ''): Wrapper<Vue> => {
    const qCheckBox = eWrapper.getByName(name)
    qCheckBox.find('.q-checkbox__native').trigger('click')
    return qCheckBox
  }

  eWrapper.validateInputs = (validatorCallbackName: string, expect: ChaiExpect, obj: { [_: string]: string }): void => {
    for (const i of Object.keys(obj)) {
      // @ts-ignore
      expect(this[validatorCallbackName](i)).to.eql(obj[i])
    }
  }

  eWrapper.validateForm = (expect: ChaiExpect, formValues: { [_: string]: { [_: string]: string } }): void => {
    const keyAndGetter: { [_: string]: string } = {
      qChipLengths: 'getQChipLength',
      options: 'getOptionsValue',
      multiOptions: 'getMultiOptionsValue',
      ints: 'getIntFromInput',
      texts: 'getTextFromInput',
    }
    for (const key of Object.keys(keyAndGetter)) {
      if (key in formValues) {
        eWrapper.validateInputs(keyAndGetter[key], expect, formValues[key])
      }
    }
  }

  eWrapper.submitForm = async (name: string): Promise<void> => {
    // $nextTick because vee-validate can't read the password value otherwise
    // (it uses the initial value)
    await eWrapper.vm.$nextTick()
    eWrapper.find('[data-name="' + name + '"]').trigger('submit')

    // We do a flushPromisesTimeout so the validator is ready after submission
    return flushPromisesTimeout()
  }

  // tslint:disable-next-line:no-any
  eWrapper.setSelectValue = (name: string, value: any): void => {
    eWrapper.find('[name="' + name + '"]').vm.$emit('input', value)
  }

  eWrapper.getByName = (name: string): Wrapper<Vue> => {
    return eWrapper.find(`[name="${name}"], [data-name="${name}"]`)
  }

  return eWrapper
}

// flush promise with timeout because the setImmediate never resolves
function flushPromisesTimeout(): Promise<void> {
  return new Promise((resolve: () => void): void => {
    setTimeout(resolve)
  })
}
