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
  /**
   * Get an input element by name or data-name
   * @param {String} name of input element
   * @returns {*}
   */
  wrapper.getInput = (name: string): Wrapper<Vue> => {
    return wrapper.find(`input[name="${name}"], input[data-name="${name}"]`)
  }

  /**
   * Get the input text from an input element
   * @param {String} name Name of input element
   * @returns {String}
   */
  wrapper.getTextFromInput = (name: string): string => {
    const input = <HTMLInputElement> wrapper.getInput(name).element
    return input.value
  }

  /**
   * Get the decimal input value from an input element
   * @param {String} name Name of input element
   * @returns {Number}
   */
  wrapper.getIntFromInput = (name: string): number => {
    const input = <HTMLInputElement> wrapper.getInput(name).element
    return parseInt(input.value, 10)
  }

  /**
   * Set the input value
   * @param {String} name of input element
   * @param {*} value New value
   */
  wrapper.setInputValue = (name: string, value): void => {
    const input = wrapper.getInput(name)
    // @ts-ignore
    input.element.value = value
    input.trigger('input')
  }

  /**
   * Get the number of selected q-chips in a quasar input element
   * @param {String} name Name of input element
   * @returns {Number}
   */
  wrapper.getQChipLength = (name: string): number => {
    return wrapper.findAll('div[name="' + name + '"] .q-chip-main').length
  }

  /**
   * Get the value of the selected option in a quasar dropdown
   * @param {String} name Name of input element
   * @returns {String}
   */
  wrapper.getOptionsValue = (name: string): string => {
    return wrapper.find('div[name="' + name + '"] div.q-input-target').element.innerHTML.trim()
  }

  /**
   * Get a list of selected options from a quasar multiselect input
   * @param {String} name Name of input element
   * @returns {Array}
   */
  wrapper.getMultiOptionsValue = (name: string): string[] => {
    return wrapper.find('div[name="' + name + '"] div.q-input-target').element.innerHTML
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '')
  }

  /**
   * Check if a given list of input names has the correct value
   * @param {String} validatorCallbackName The name of the function in the wrapper to get the input values
   * @parem {Function} expect The jest expect function
   * @parem {Object} A list of input names with their expected values
   */
  wrapper.validateInputs = (validatorCallbackName: string, expect: ChaiExpect, obj: { [_: string]: string }): void => {
    for (const i of Object.keys(obj)) {
      // @ts-ignore
      expect(this[validatorCallbackName](i)).to.eql(obj[i])
    }
  }

  /**
   * Validate the values in a quasar form
   * @param {Function} expect The chai expect function
   * @param {Object} formValues An object with input types,
   *    each input type contains a list of inputs and expected values
   */
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

  /**
   * Submit form
   * @param {name} string form name
   * @returns {Promise} empty promise
   */
  wrapper.submitForm = async (name: string): Promise<object> => {
    // $nextTick because vee-validate can't read the password value otherwise
    // (it uses the initial value)
    await wrapper.vm.$nextTick()
    wrapper.find('[data-name="' + name + '"]').trigger('submit')

    return new Promise((resolve, reject): void => {
      setTimeout(() => resolve(), 25)
    })
  }

  /**
   * Set value of quasar select input
   * @param {string} name input name
   * @param {string}  value to set in input
   * @returns {Promise} empty promise
   */
  // tslint:disable-next-line:no-any
  wrapper.setSelectValue = (name: string, value: any): void => {
    wrapper.find('[name="' + name + '"').vm.$emit('input', value)
  }

  return wrapper
}
