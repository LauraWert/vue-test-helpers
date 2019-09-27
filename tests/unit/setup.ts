import VeeFormHandler from '@laura-wert/vee-form-handler'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import Vue from 'vue'
import { addQuasarToVue } from '../../src/setup-vue'

chai.use(sinonChai)
addQuasarToVue()
Vue.use(VeeFormHandler, {
  locale: 'nl',
  dictionaries: [],
})
