import { mount, shallow } from '@vue/test-utils'

export function eMount (component, options) {
  return extendWrapper(mount(component, options))
}

export function eShallow (component, options) {
  return extendWrapper(shallow(component, options))
}

export function extendWrapper (wrapper) {
  /**
   * Get an input element
   * @param {String} name of input element
   * @returns {*}
   */
  wrapper.getInput = name => wrapper.find('input[name="' + name + '"]')

  /**
   * Get the input text from an input element
   * @param {String} name Name of input element
   * @returns {String}
   */
  wrapper.getTextFromInput = name => this.getInput(name).element.value

  /**
   * Get the decimal input value from an input element
   * @param {String} name Name of input element
   * @returns {Number}
   */
  wrapper.getIntFromInput = name => parseInt(this.getInput(name).element.value, 10)

  /**
   * Set the input value
   * @param {String} name of input element
   * @param {*} value New value
   */
  wrapper.setInputValue = (name, value) => {
    const input = wrapper.getInput(name)
    input.element.value = value
    input.trigger('input')
  }

  /**
   * Get the number of selected q-chips in a quasar input element
   * @param {String} name Name of input element
   * @returns {Number}
   */
  wrapper.getQChipLength = (name) => {
    return this.findAll('div[name="' + name + '"] .q-chip-main').length
  }

  /**
   * Get the value of the selected option in a quasar dropdown
   * @param {String} name Name of input element
   * @returns {String}
   */
  wrapper.getOptionsValue = (name) => {
    return this.find('div[name="' + name + '"] div.q-input-target').element.innerHTML.trim()
  }

  /**
   * Get a list of selected options from a quasar multiselect input
   * @param {String} name Name of input element
   * @returns {Array}
   */
  wrapper.getMultiOptionsValue = (name) => {
    return this.find('div[name="' + name + '"] div.q-input-target').element.innerHTML
      .split(',')
      .map(v => v.trim())
      .filter(v => v !== '')
  }

  /**
   * Check if a given list of input names has the correct value
   * @param {String} validatorCallbackName The name of the function in the wrapper to get the input values
   * @parem {Function} expect The jest expect function
   * @parem {Object} A list of input names with their expected values
   */
  wrapper.validateInputs = (validatorCallbackName, expect, obj) => {
    for (var i in obj) {
      expect(this[validatorCallbackName](i)).toEqual(obj[i])
    }
  }

  /**
   * Validate the values in a quasar form
   * @param {Function} expect The jest expect function
   * @param {Object} formValues An object with input types, each input type contains a list of inputs and expected values
   */
  wrapper.validateForm = (expect, formValues) => {
    let keyAndGetter = {
      qChipLengths: 'getQChipLength',
      options: 'getOptionsValue',
      multiOptions: 'getMultiOptionsValue',
      ints: 'getIntFromInput',
      texts: 'getTextFromInput',
    }
    for (let key in keyAndGetter) {
      key in formValues && wrapper.validateInputs(keyAndGetter[key], expect, formValues[key])
    }
  }

  return wrapper
}
