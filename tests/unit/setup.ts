import VeeFormHandler from '@laura-wert/vee-form-handler'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import Vue from 'vue'
import { addQuasarToVue } from '../../src/setup-vue'

// tslint:disable-next-line:no-any
(global as any).expect = expect

chai.use(sinonChai)
addQuasarToVue()
Vue.use(VeeFormHandler, {
  locale: 'nl',
  dictionaries: [],
})
