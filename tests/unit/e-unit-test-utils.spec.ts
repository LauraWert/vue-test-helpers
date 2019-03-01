import { expect } from 'chai'
import { eMount } from 'src/e-unit-test-utils'
import EWrapperHelper from '../helpers/EWrapperHelper.vue'

describe('e-unit-test-utils', (): void => {
  it('can get element by data-name', () => {
    const wrapper = eMount(EWrapperHelper)
    expect(wrapper.getByName('my-data-name-element').text()).to.equal('data-name content')
  })

  it('can set an input value', () => {
    const wrapper = eMount(EWrapperHelper)
    wrapper.setInputValue('my-input', 'foo bar')
    expect(wrapper.getByName('my-input').emitted('input')[0]).to.eql(['foo bar'])
  })

  it('can toggle a checkbox', () => {
    const wrapper = eMount(EWrapperHelper)

    const checkbox = wrapper.toggleCheckbox('my-checkbox')
    expect(checkbox.emitted('input')[0]).to.eql([true])
  })
})
